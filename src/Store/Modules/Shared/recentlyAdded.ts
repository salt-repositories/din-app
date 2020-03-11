import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Content} from "../../../Domain/Models/Abstractions";
import { Filters, QueryParameters, QueryResult } from "../../../Domain/Models/Querying";

export interface IRecentlyAdded<TModel extends Content> {
    items: TModel[];
    loading: boolean;
    ssr: boolean;
    filters: Filters;
    queryParams: QueryParameters;

    setLoading: Action<IRecentlyAdded<TModel>, boolean>;
    setSsr: Action<IRecentlyAdded<TModel>, boolean>;
    addRecentlyAdded: Action<IRecentlyAdded<TModel>, TModel>;
    getRecentlyAdded: Thunk<IRecentlyAdded<TModel>>;
    next: Thunk<IRecentlyAdded<TModel>>;
}

export const recentlyAdded = <TModel extends Content>(
    getModelMethod: (params, filters) => Promise<QueryResult<TModel>>,
): IRecentlyAdded<TModel> => {
    return {
        items: [],
        loading: false,
        ssr: false,
        filters: new Filters(null, null, null, null, true, true),
        queryParams: new QueryParameters(0, 20, "Added", "Desc"),
        setLoading: action((state: IRecentlyAdded<TModel>, payload: boolean) => {
            state.loading = payload;
        }),
        setSsr: action((state: IRecentlyAdded<TModel>, payload: boolean) => {
            state.ssr = payload;
        }),
        addRecentlyAdded: action((state: IRecentlyAdded<TModel>, payload: TModel) => {
            state.items.push(payload);
        }),
        getRecentlyAdded: thunk(async (actions: Actions<IRecentlyAdded<TModel>>, _, helpers) => {
            actions.setLoading(true);

            const state = helpers.getState();
            const result = await getModelMethod(state.queryParams, state.filters);

            result.items.map((item: TModel) => {
                actions.addRecentlyAdded(item);
            });

            actions.setLoading(false);
        }),
        next: thunk((actions: Actions<IRecentlyAdded<TModel>>, _, helpers) => {
            const state = helpers.getState();

            const params = state.queryParams;
            params.skip += 20;
            actions.getRecentlyAdded();
        }),
    };
};
