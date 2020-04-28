import { serialize } from "class-transformer";
import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { ValidationError } from "../../Domain/Models/Exeptions";
import { Movie, MovieQueryResult, MovieSearch } from "../../Domain/Models/Movies";
import { MovieHistory } from "../../Domain/Models/Movies/MovieHistory";
import { Filters, QueryParameters } from "../../Domain/Models/Querying";
import { HttpClient } from "../../Domain/Utils";
import { IRootState } from "../index";
import { calendar, filteredContent, ICalendar, IFilteredContent } from "../Shared";
import { contentState, IContent } from "../Shared/content";
import { ISearch, searchState } from "../Shared/search";

export interface IMovieState {
    recentlyAddedMovies: IFilteredContent<Movie>,
    toBeDownloadedMovies: IFilteredContent<Movie>,
    calendar: ICalendar<Movie>;
    movies: IContent<Movie>;
    search: ISearch<Movie, MovieSearch>;

    addToSystemLoading: boolean;
    addToSystem: Thunk<IMovieState, MovieSearch, any, IRootState, Promise<Movie | ValidationError[]>>;
    resetSearchResults: Action<IMovieState>;
    setAddToSystemLoading: Action<IMovieState, boolean>;

    history: MovieHistory[];
    getHistoryLoading: boolean;
    getHistory: Thunk<IMovieState, number, any, IRootState, Promise<MovieHistory[]>>;
    setHistory: Action<IMovieState, MovieHistory[]>;
    setHistoryLoading: Action<IMovieState, boolean>;
}

export const movieState: IMovieState = {
    recentlyAddedMovies: filteredContent<Movie>(
        (accessToken , params, filters) => {
            return HttpClient.get("/v1/movies", {
                type: MovieQueryResult,
                accessToken,
                queryParameters: params,
                filters,
            });
        },
        new Filters(null, null, "true", null, true, true),
    ),
    toBeDownloadedMovies: filteredContent<Movie>(
        (accessToken , params, filters) => {
            return HttpClient.get("/v1/movies", {
                type: MovieQueryResult,
                accessToken,
                queryParameters: params,
                filters,
            });
        },
        new Filters(null, null, "false", null, true, true),
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

        actions.resetSearchResults();
        actions.setAddToSystemLoading(false);

        return response;
    }),
    resetSearchResults: action((state: IMovieState) => {
        state.search.results = {
            current: [],
            searchResults: [],
        };
    }),
    setAddToSystemLoading: action((state: IMovieState, payload: boolean) => {
        state.addToSystemLoading = payload;
    }),

    history: [],
    getHistoryLoading: false,
    getHistory: thunk(async (actions: Actions<IMovieState>, payload: number, { getStoreState }) => {
        actions.setHistoryLoading(true);

        const response = await HttpClient.get(`/v1/movies/${payload}/history`, {
            type: MovieHistory,
            accessToken: getStoreState().authentication.token.accessToken,

        }) as unknown as MovieHistory[];

        actions.setHistory(response);
        actions.setHistoryLoading(false);

        return response;
    }),
    setHistory: action((state: IMovieState, payload: MovieHistory[]) => {
        state.history = payload;
    }),
    setHistoryLoading: action((state: IMovieState, payload: boolean) => {
        state.getHistoryLoading = payload;
    }),
};
