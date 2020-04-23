import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Content, Search } from "../../Domain/Models/Abstractions";
import { Filters, QueryParameters, QueryResult } from "../../Domain/Models/Querying";
import { IRootState } from "../index";

export interface ISearchResult<TModel extends Content, TSearch extends Search> {
    current: TModel[];
    searchResults: TSearch[];
}

export interface ISearch<TModel extends Content, TSearch extends Search> {
    results: ISearchResult<TModel, TSearch>;

    loading: boolean;
    params: QueryParameters;
    filters: Filters;

    search: Thunk<ISearch<TModel, TSearch>, string, any, IRootState, Promise<ISearchResult<TModel, TSearch>>>;
    setResults: Action<ISearch<TModel, TSearch>, ISearchResult<TModel, TSearch>>;
    setLoading: Action<ISearch<TModel, TSearch>, boolean>;
}

export const searchState = <TModel extends Content, TSearch extends Search>(
    getMethod: (accessToken: string, params: QueryParameters, filters: any) => Promise<QueryResult<TModel>>,
    searchMethod: (accessToken: string, title: string) => Promise<TSearch[]>
): ISearch<TModel, TSearch> => {
    return {
        results: {
            current: [],
            searchResults: [],
        },

        loading: false,
        params: new QueryParameters(0, 20, "title", "Asc"),
        filters: new Filters(null, null, null, null, true, true),

        search: thunk(async (actions: Actions<ISearch<TModel, TSearch>>, payload: string, { getState, getStoreState }) => {
            actions.setLoading(true);

            const state = getState();
            const current = getMethod(getStoreState().authentication.token.accessToken, state.params, {
                ...state.filters,
                title: payload,
            });
            const searchResults = searchMethod(getStoreState().authentication.token.accessToken, payload);

            await Promise.all([current, searchResults]);

            const results = {
                current: (await current).items,
                searchResults: await searchResults,
            };

            actions.setResults(results);
            actions.setLoading(false);

            return results;
        }),
        setResults: action((state: ISearch<TModel, TSearch>, payload) => {
            state.results = payload;
        }),
        setLoading: action((state: ISearch<TModel, TSearch>, payload: boolean) => {
            state.loading = payload;
        }),
    }
};

