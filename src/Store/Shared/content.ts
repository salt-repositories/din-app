import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Content } from "../../Domain/Models/Abstractions";
import { Filters, QueryParameters, QueryResult } from "../../Domain/Models/Querying";
import { IRootState } from "../index";

export interface IContent<T extends Content> {
    item;
    collection: QueryResult<T>;

    params: QueryParameters;
    filters: Filters;

    setParamProp: Action<IContent<T>, [string, any]>;
    setFilterProp: Action<IContent<T>, [string, any]>;

    getLoading: boolean;
    get: Thunk<IContent<T>, void, any, IRootState, Promise<QueryResult<T>>>;
    setCollection: Action<IContent<T>, QueryResult<T>>;
    setGetLoading: Action<IContent<T>, boolean>;

    getByIdLoading: boolean;
    getById: Thunk<IContent<T>, number, any, IRootState, Promise<T>>;
    setItem: Action<IContent<T>, T>;
    setGetByIdLoading: Action<IContent<T>, boolean>;

    nextLoading: boolean;
    next: Thunk<IContent<T>, void, any, IRootState, Promise<QueryResult<T>>>;
    appendCollection: Action<IContent<T>, T>;
    setNextLoading: Action<IContent<T>, boolean>;
}

export const contentState = <T extends Content>(
    getAllMethod: (accessToken: string, params: QueryParameters, filters: any) => Promise<QueryResult<T>>,
    getByIdMethod: (accessToken: string, id: number) => Promise<T>
): IContent<T> => {
    return {
        item: undefined,
        collection: {
            items: [],
            totalCount: undefined,
        },

        params: new QueryParameters(0, 20, "title", "Asc"),
        filters: new Filters(null, null, null, null),

        setParamProp: action((state: IContent<T>, payload: [string, string]) => {
            state.params[payload[0]] = payload[1];
        }),
        setFilterProp: action((state: IContent<T>, payload: [string, string]) => {
            state.filters[payload[0]] = payload[1];
        }),

        getLoading: false,
        get: thunk(async (actions: Actions<IContent<T>>, _, { getState, getStoreState }): Promise<QueryResult<T>> => {
            actions.setGetLoading(true);

            const state = getState();
            const response = await getAllMethod(getStoreState().authentication.token.accessToken, state.params, state.filters);

            actions.setCollection(response);
            actions.setGetLoading(false);

            return response;
        }),
        setCollection: action((state: IContent<T>, payload: QueryResult<T>) => {
            state.collection = payload;
        }),
        setGetLoading: action((state: IContent<T>, payload: boolean) => {
            state.getLoading = payload;
        }),

        getByIdLoading: false,
        getById: thunk(async (actions: Actions<IContent<T>>, payload: number, { getStoreState }) => {
            actions.setGetByIdLoading(true);

            const item = await getByIdMethod(getStoreState().authentication.token.accessToken, payload);

            actions.setItem(item);
            actions.setGetByIdLoading(false);

            return item;
        }),
        setItem: action((state: IContent<T>, payload: T) => {
            state.item = payload;
        }),
        setGetByIdLoading: action((state: IContent<T>, payload: boolean) => {
            state.getByIdLoading = payload;
        }),

        nextLoading: false,
        next: thunk(async (actions: Actions<IContent<T>>,_, { getState, getStoreState }) => {
            actions.setNextLoading(true);

            const state = getState();
            state.params.skip += state.params.take;

            const response = await getAllMethod(getStoreState().authentication.token.accessToken, state.params, state.filters);
            response.items.map((item) => actions.appendCollection(item));

            actions.setNextLoading(false);

            return response;
        }),
        appendCollection: action((state: IContent<T>, payload: T) => {
            state.collection.items.push(payload);
        }),
        setNextLoading: action((state: IContent<T>, payload: boolean) => {
            state.nextLoading = payload;
        }),
    };
};
