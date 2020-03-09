import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Content, Search } from "../../../Domain/Models/Abstractions";
import { Filters, QueryParameters } from "../../../Domain/Models/Querying";

export interface IRecentlyAdded<TModel extends Content, TSearchModel extends Search> {
    items: [TModel, TSearchModel][];
    loading: boolean;
    ssr: boolean;
    filters: Filters;
    queryParams: QueryParameters;

    setLoading: Action<IRecentlyAdded<TModel, TSearchModel>, boolean>;
    setSsr: Action<IRecentlyAdded<TModel, TSearchModel>, boolean>;
    addRecentlyAdded: Action<IRecentlyAdded<TModel, TSearchModel>, [TModel, TSearchModel]>;
    getRecentlyAdded: Thunk<IRecentlyAdded<TModel, TSearchModel>>;
    next: Thunk<IRecentlyAdded<TModel, TSearchModel>>;
}

export const recentlyAdded = <TModel extends Content, TSearchModel extends Search>(
    getModelMethod,
    getSearchModelMethod,
): IRecentlyAdded<TModel, TSearchModel> => {
    return {
        items: [],
        loading: false,
        ssr: false,
        filters: new Filters(null, null, null, null, true),
        queryParams: new QueryParameters(0, 20, "Added", "Desc"),
        setLoading: action((state: IRecentlyAdded<TModel, TSearchModel>, payload: boolean) => {
            state.loading = payload;
        }),
        setSsr: action((state: IRecentlyAdded<TModel, TSearchModel>, payload: boolean) => {
            state.ssr = payload;
        }),
        addRecentlyAdded: action((state: IRecentlyAdded<TModel, TSearchModel>, payload: [TModel, TSearchModel]) => {
            state.items.push(payload);
        }),
        getRecentlyAdded: thunk(async (actions: Actions<IRecentlyAdded<TModel, TSearchModel>>, _, helpers) => {
            actions.setLoading(true);

            const state = helpers.getState();

            const modelResult = await getModelMethod(state.queryParams, state.filters);
            const searchMovies = await Promise.all(
                modelResult.items.map(async (item) => await getSearchModelMethod(item.title))
            );

            searchMovies.map((result, index) => {
                actions.addRecentlyAdded([modelResult.items[index], result[0]]);
            });

            actions.setLoading(false);
        }),
        next: thunk((actions: Actions<IRecentlyAdded<TModel, TSearchModel>>, _, helpers) => {
            const state = helpers.getState();

            const params = state.queryParams;
            params.skip += 20;
            actions.getRecentlyAdded();
        }),
    };
};
