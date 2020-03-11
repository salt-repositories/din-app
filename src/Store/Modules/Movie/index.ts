import { ApiClientProvider } from "../../../Domain/Client";
import { Movie} from "../../../Domain/Models/Movies";
import { Filters, QueryParameters } from "../../../Domain/Models/Querying";
import { calendar, ICalendar, IRecentlyAdded, recentlyAdded } from "../Shared";

export interface IMovieState {
    recentlyAddedMovies: IRecentlyAdded<Movie>,
    calendar: ICalendar<Movie>;
    filters: Filters;
    queryParams: QueryParameters;
}

export const movieState: IMovieState = {
    recentlyAddedMovies: recentlyAdded<Movie>(
        (params, filters) => {
            const apiClient = ApiClientProvider.getClient();
            return apiClient.v1.movies.getMovies(params, filters);
        }
    ),
    calendar: calendar<Movie>(
        (from, till) => {
            const apiClient = ApiClientProvider.getClient();
            return apiClient.v1.movies.getCalendar(from, till);
        }
    ),
    filters: new Filters(),
    queryParams: new QueryParameters(),
};
