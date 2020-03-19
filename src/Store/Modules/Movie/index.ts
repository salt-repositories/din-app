import { ApiClientProvider } from "../../../Domain/Client";
import { Movie } from "../../../Domain/Models/Movies";
import { calendar, ICalendar, IRecentlyAdded, recentlyAdded } from "../Shared";
import { contentState, IContent } from "../Shared/content";

export interface IMovieState {
    recentlyAddedMovies: IRecentlyAdded<Movie>,
    calendar: ICalendar<Movie>;
    movies: IContent<Movie>;
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
    movies: contentState(
        (params, filters) => {
            const apiClient = ApiClientProvider.getClient();
            return apiClient.v1.movies.getMovies(params, filters);
        },
        (id) => {
            const apiClient = ApiClientProvider.getClient();
            return apiClient.v1.movies.getMovieById(id, true, true);
        }
    )
};
