import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Content } from "../../../Domain/Models/Abstractions";
import { Filters, QueryParameters, QueryResult } from "../../../Domain/Models/Querying";

export interface IContent<T extends Content> {
    item;
<<<<<<< HEAD
    collection: QueryResult<T>;
=======
    items: T[];
>>>>>>> develop

    loading: boolean;
    params: QueryParameters;
    filters: Filters;

    setLoading: Action<IContent<T>, boolean>;
    setParamProp: Action<IContent<T>, [string, string]>;
    setFilterProp: Action<IContent<T>, [string, string]>;

    get: Thunk<IContent<T>>;
    getById: Thunk<IContent<T>, number>;
    add: Action<IContent<T>, T>;
<<<<<<< HEAD
    set: Action<IContent<T>, QueryResult<T>>;
=======
    set: Action<IContent<T>, T[]>;
>>>>>>> develop
    next: Thunk<IContent<T>>;
}

export const contentState = <T extends Content>(
    getAllMethod: (params, filters) => Promise<QueryResult<T>>,
    getByIdMethod: (id) => Promise<T>
): IContent<T> => {
    return {
        item: undefined,
<<<<<<< HEAD
        collection: undefined,
=======
        items: [],
>>>>>>> develop

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
<<<<<<< HEAD
            actions.set(await getAllMethod(state.params, state.filters));
=======
            const result = await getAllMethod(state.params, state.filters);
            actions.set(result.items);
>>>>>>> develop
            actions.setLoading(false);
        }),
        getById: thunk(async (actions: Actions<IContent<T>>, payload: number, helpers) => {
            actions.setLoading(true);

            const state = helpers.getState();
            state.item = await getByIdMethod(payload);

            actions.setLoading(false);
        }),
        add: action((state: IContent<T>, payload: T) => {
<<<<<<< HEAD
            state.collection.items.push(payload);
        }),
        set: action((state: IContent<T>, payload: QueryResult<T>) => {
            state.collection = payload;
=======
            state.items.push(payload);
        }),
        set: action((state: IContent<T>, payload: T[]) => {
            state.items = payload;
>>>>>>> develop
        }),
        next: thunk(async (actions: Actions<IContent<T>>,_, helpers) => {
            actions.setLoading(true);

            const state = helpers.getState();
            state.params.skip += 20;

            const results = await getAllMethod(state.params, state.filters);
            results.items.map((item) => actions.add(item));

            actions.setLoading(false);
        })
    };
};
