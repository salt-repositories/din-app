import { action, Action, thunk, Thunk } from "easy-peasy";
import { ApiClientProvider } from "../../../Domain/Client";
import { Movie, MovieSearch } from "../../../Domain/Models/Movies";
import { Filters, QueryParameters } from "../../../Domain/Models/Querying";

export interface IMovieState {
    recentlyAddedMovies: Array<[Movie, MovieSearch]>;
    getRecentlyAddedMovies: Thunk<IMovieState>;
    addRecentlyAddedMovies: Action<IMovieState, [Movie, MovieSearch]>;
    filters: Filters;
    queryParams: QueryParameters;
}

export const movieState: IMovieState = {
    recentlyAddedMovies: [],
    getRecentlyAddedMovies: thunk(async (actions, _, helpers) => {
        const apiClient = ApiClientProvider.getClient();

        const params = helpers.getState().queryParams;
        const filters = helpers.getState().filters;

        params.sortBy = "Added";
        params.sortDirection = "Desc";
        filters.plex = true;

        const movies = await apiClient.v1.movies.getMovies(params, filters);
        const searchMovies = await Promise.all(
            movies.items.map(async (movie) => apiClient.v1.movies.searchMovieByQuery(movie.title)).flat(1),
        );

        searchMovies.map((result, index) => {
            actions.addRecentlyAddedMovies([movies.items[index], result[0]]);
        });
    }),
    addRecentlyAddedMovies: action((state: IMovieState, payload: [Movie, MovieSearch]) => {
        state.recentlyAddedMovies.push(payload);
    }),
    filters: new Filters(),
    queryParams: new QueryParameters(),
};
