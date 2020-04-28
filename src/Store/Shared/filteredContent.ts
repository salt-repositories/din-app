import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Content } from "../../Domain/Models/Abstractions";
import { Filters, QueryParameters, QueryResult } from "../../Domain/Models/Querying";
import { IRootState } from "../index";

export interface IFilteredContent<T extends Content> {
    collection: QueryResult<T>;

    filters: Filters;
    queryParams: QueryParameters;

    getLoading: boolean;
    get: Thunk<IFilteredContent<T>, void, any, IRootState, Promise<QueryResult<T>>>;
    setCollection: Action<IFilteredContent<T>, QueryResult<T>>
    setGetLoading: Action<IFilteredContent<T>, boolean>;

    nextLoading: boolean;
    next: Thunk<IFilteredContent<T>, void, any, IRootState, Promise<QueryResult<T>>>;
    appendCollection: Action<IFilteredContent<T>, T>;
    setNextLoading: Action<IFilteredContent<T>, boolean>;
}

export const filteredContent = <T extends Content>(
    getModelMethod: (accessToken: string, params: QueryParameters, filters: any) => Promise<QueryResult<T>>,
    filters: Filters,
): IFilteredContent<T> => {
    return {
        collection: {
            items: [],
            totalCount: undefined
        },

        filters,
        queryParams: new QueryParameters(0, 20, "Added", "Desc"),

        getLoading: false,
        get: thunk(async (actions: Actions<IFilteredContent<T>>, _, { getState, getStoreState }) => {
            actions.setGetLoading(true);

            const state = getState();
            const response = await getModelMethod(getStoreState().authentication.token.accessToken, state.queryParams, state.filters);

            actions.setCollection(response);
            actions.setGetLoading(false);

            return response;
        }),
        setCollection: action((state: IFilteredContent<T>, payload: QueryResult<T>) => {
            state.collection = payload;
        }),
        setGetLoading: action((state: IFilteredContent<T>, payload: boolean) => {
            state.getLoading = payload;
        }),

        nextLoading: false,
        next: thunk(async (actions: Actions<IFilteredContent<T>>, _, { getState, getStoreState }) => {
            actions.setNextLoading(true);

            const state = getState();
            state.queryParams.skip += state.queryParams.take;

            const response = await getModelMethod(getStoreState().authentication.token.accessToken, state.queryParams, state.filters);
            response.items.map((item) => actions.appendCollection(item));

            actions.setNextLoading(false);

            return response;
        }),
        appendCollection: action((state: IFilteredContent<T>, payload: T) => {
            state.collection.items.push(payload);
        }),
        setNextLoading: action((state: IFilteredContent<T>, payload: boolean) => {
            state.nextLoading = payload;
        }),
    };
};
