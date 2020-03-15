import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Content } from "../../../Domain/Models/Abstractions";
import { Filters, QueryParameters, QueryResult } from "../../../Domain/Models/Querying";

export interface IContent<T extends Content> {
    items: T[];

    loading: boolean;
    params: QueryParameters;
    filters: Filters;

    setLoading: Action<IContent<T>, boolean>;
    setParamProp: Action<IContent<T>, [string, string]>;
    setFilterProp: Action<IContent<T>, [string, string]>;

    get: Thunk<IContent<T>>;
    add: Action<IContent<T>, T>;
    set: Action<IContent<T>, T[]>;
    next: Thunk<IContent<T>>;
}

export const contentState = <T extends Content>(
    getMethod: (params, filters) => Promise<QueryResult<T>>
): IContent<T> => {
    return {
        items: [],

        loading: false,
        params: new QueryParameters(0, 20, "title", "Asc"),
        filters: new Filters(null, null, null, null, true, true),

        setLoading: action((state: IContent<T>, payload: boolean) => {
            state.loading = payload;
        }),
        setParamProp: action((state: IContent<T>, payload: [string, string]) => {
            state.params[payload[0]] = payload[1];
        }),
        setFilterProp: action((state: IContent<T>, payload: [string, string]) => {
            state.filters[payload[0]] = payload[1];
        }),

        get: thunk(async (actions: Actions<IContent<T>>, _, helpers) => {
            actions.setLoading(true);

            const state = helpers.getState();
            const result = await getMethod(state.params, state.filters);
            actions.set(result.items);
            actions.setLoading(false);
        }),
        add: action((state: IContent<T>, payload: T) => {
            state.items.push(payload);
        }),
        set: action((state: IContent<T>, payload: T[]) => {
            state.items = payload;
        }),
        next: thunk(async (actions: Actions<IContent<T>>,_, helpers) => {
            actions.setLoading(true);

            const state = helpers.getState();
            state.params.skip += 20;

            const results = await getMethod(state.params, state.filters);
            results.items.map((item) => actions.add(item));

            actions.setLoading(false);
        })
    };
};
