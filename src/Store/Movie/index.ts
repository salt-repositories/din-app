import { serialize } from "class-transformer";
import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { ValidationError } from "../../Domain/Models/Exeptions";
import { Movie, MovieQueryResult, MovieSearch } from "../../Domain/Models/Movies";
import { QueryParameters } from "../../Domain/Models/Querying";
import { HttpClient } from "../../Domain/Utils";
import { IRootState } from "../index";
import { calendar, ICalendar, IRecentlyAdded, recentlyAdded } from "../Shared";
import { contentState, IContent } from "../Shared/content";
import { ISearch, searchState } from "../Shared/search";

export interface IMovieState {
    recentlyAddedMovies: IRecentlyAdded<Movie>,
    calendar: ICalendar<Movie>;
    movies: IContent<Movie>;
    search: ISearch<Movie, MovieSearch>;

    addToSystemLoading: boolean;
    addToSystem: Thunk<IMovieState, MovieSearch, any, IRootState, Promise<Movie | ValidationError[]>>;
    setAddToSystemLoading: Action<IMovieState, boolean>;
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
    ),
    search: searchState(
        (accessToken: string, params: QueryParameters, filters) => {
            return HttpClient.get("/v1/movies", {
                type: MovieQueryResult,
                accessToken,
                queryParameters: params,
                filters,
            });
        },
        (accessToken: string, title: string) => {
            return HttpClient.get(`/v1/movies/search?query=${title}`, {
                type: MovieSearch,
                accessToken,
            }) as unknown as Promise<MovieSearch[]>;
        }
    ),

    addToSystemLoading: false,
    addToSystem: thunk(async (actions: Actions<IMovieState>, payload: MovieSearch, { getStoreState }) => {
        actions.setAddToSystemLoading(true);

        const response = await HttpClient.post("/v1/movies", {
            type: Movie,
            accessToken: getStoreState().authentication.token.accessToken,
            body: serialize({
                tmdb_id: payload.tmdbId,
                title: payload.title,
                year: payload.releaseDate.year(),
                poster_path: payload.posterPath,
            })
        });

        actions.setAddToSystemLoading(false);

        return response;
    }),
    setAddToSystemLoading: action((state: IMovieState, payload: boolean) => {
        state.addToSystemLoading = payload;
    })
};
