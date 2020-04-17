import { Movie, MovieQueryResult } from "../../Domain/Models/Movies";
import { HttpClient } from "../../Domain/Utils";
import { calendar, ICalendar, IRecentlyAdded, recentlyAdded } from "../Shared";
import { contentState, IContent } from "../Shared/content";

export interface IMovieState {
    recentlyAddedMovies: IRecentlyAdded<Movie>,
    calendar: ICalendar<Movie>;
    movies: IContent<Movie>;
}

export const movieState: IMovieState = {
    recentlyAddedMovies: recentlyAdded<Movie>(
        (accessToken , params, filters) => {
            return HttpClient.get("/v1/movies", {
                type: MovieQueryResult,
                accessToken,
                queryParameters: params,
                filters,
            });
        }
    ),
    calendar: calendar<Movie>(
        (accessToken: string, from: string, till: string) => {
            return HttpClient.get(`/v1/movies/calendar?from=${from}&till=${till}`, {
                type: Movie,
                accessToken,
            }) as unknown as Promise<Movie[]>;
        }
    ),
    movies: contentState(
        (accessToken, params, filters) => {
            return HttpClient.get("/v1/movies", {
                type: MovieQueryResult,
                accessToken,
                queryParameters: params,
                filters,
            });
        },
        (accessToken, id) => {
            return HttpClient.get(`/v1/movies/${id}`, {
                type: Movie,
                accessToken,
                filters: {
                    plex: true,
                    poster: true,
                }
            });
        }
    )
};
