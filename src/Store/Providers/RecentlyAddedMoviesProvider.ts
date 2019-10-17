import { ApiClientProvider } from "../../Client";
import { Movie, MovieSearch } from "../../Models/Movies";
import { Filters, QueryParameters } from "../../Models/Querying";

const apiClient = ApiClientProvider.getClient();

export const RecentlyAddedMoviesProvider =
    async (stateValues: Array<[Movie, MovieSearch]>, setRecentlyAdded): Promise<Array<[Movie, MovieSearch]>> => {
        if (!stateValues) {

            const queryParameters = new QueryParameters(
                0,
                20,
                "added",
                "Desc",
            );
            const filters = new Filters(
                null,
                null,
                "true",
                null,
            );

            const movies = await apiClient.v1.movies.getMovies(queryParameters, filters);

            const results = await Promise.all(
                movies.items.map(async (movie) => apiClient.v1.movies.searchMovieByQuery(movie.title)).flat(1),
            );

            stateValues = results.map((result, index) => [movies.items[index], result[0]]);
            setRecentlyAdded(stateValues);
        }

        return stateValues;
    };
