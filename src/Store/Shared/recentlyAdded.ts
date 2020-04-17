import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Content } from "../../Domain/Models/Abstractions";
import { Filters, QueryParameters, QueryResult } from "../../Domain/Models/Querying";
import { IRootState } from "../index";

export interface IRecentlyAdded<TModel extends Content> {
    items: TModel[];
    loading: boolean;

    filters: Filters;
    queryParams: QueryParameters;

    setLoading: Action<IRecentlyAdded<TModel>, boolean>;
    getRecentlyAdded: Thunk<IRecentlyAdded<TModel>, void, any, IRootState, Promise<TModel[]>>;
    addRecentlyAdded: Action<IRecentlyAdded<TModel>, TModel>;
    next: Thunk<IRecentlyAdded<TModel>>;
}

export const recentlyAdded = <TModel extends Content>(
    getModelMethod: (accessToken: string, params: QueryParameters, filters: any) => Promise<QueryResult<TModel>>,
): IRecentlyAdded<TModel> => {
    return {
        items: [],
        loading: false,

        filters: new Filters(null, null, null, null, true, true),
        queryParams: new QueryParameters(0, 20, "Added", "Desc"),

        setLoading: action((state: IRecentlyAdded<TModel>, payload: boolean) => {
            state.loading = payload;
        }),
        getRecentlyAdded: thunk(async (actions: Actions<IRecentlyAdded<TModel>>, _, { getState, getStoreState }) => {
            actions.setLoading(true);

            const state = getState();
            const result = await getModelMethod(getStoreState().authentication.token.accessToken, state.queryParams, state.filters);

            result.items.map((item: TModel) => {
                actions.addRecentlyAdded(item);
            });

            actions.setLoading(false);

            return result.items;
        }),
        addRecentlyAdded: action((state: IRecentlyAdded<TModel>, payload: TModel) => {
            state.items.push(payload);
        }),
        next: thunk((actions: Actions<IRecentlyAdded<TModel>>, _, { getState }) => {
            const state = getState();

            const params = state.queryParams;
            params.skip += 20;
            actions.getRecentlyAdded();
        }),
    };
};
