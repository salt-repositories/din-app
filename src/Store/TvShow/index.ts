import { serialize } from "class-transformer";
import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { ValidationError } from "../../Domain/Models/Exeptions";
import { QueryParameters } from "../../Domain/Models/Querying";
import { TvShow, TvShowCalendar, TvShowQueryResult, TvShowSearch } from "../../Domain/Models/TvShow";
import { HttpClient } from "../../Domain/Utils";
import { IRootState } from "../index";
import { calendar, ICalendar, IRecentlyAdded, recentlyAdded } from "../Shared";
import { contentState, IContent } from "../Shared/content";
import { ISearch, searchState } from "../Shared/search";

export interface ITvShowState {
    recentlyAddedTvShows: IRecentlyAdded<TvShow>;
    calendar: ICalendar<TvShowCalendar>;
    tvShows: IContent<TvShow>;
    search: ISearch<TvShow, TvShowSearch>;

    addToSystemLoading: boolean;
    addToSystem: Thunk<ITvShowState, TvShowSearch, any, IRootState, Promise<TvShow | ValidationError[]>>;
    setAddToSystemLoading: Action<ITvShowState, boolean>;
}

export const tvShowState: ITvShowState = {
    recentlyAddedTvShows: recentlyAdded<TvShow>(
        (accessToken, params, filters) => {
            return HttpClient.get("/v1/tvshows", {
                type: TvShowQueryResult,
                accessToken,
                queryParameters: params,
                filters,
            });
        },
    ),
    calendar: calendar<TvShowCalendar>(
        (accessToken: string, from: string, till: string) => {
            return HttpClient.get(`/v1/tvshows/calendar?from=${from}&till=${till}`, {
                type: TvShowCalendar,
                accessToken,
            }) as unknown as Promise<TvShowCalendar[]>;
        }
    ),
    tvShows: contentState(
        (accessToken, params, filters) => {
            return HttpClient.get("/v1/tvshows", {
                type: TvShowQueryResult,
                accessToken,
                queryParameters: params,
                filters,
            });
        },
        (accessToken, id) => {
            return HttpClient.get(`/v1/tvshows/${id}`, {
                type: TvShow,
                accessToken,
            });
        }
    ),
    search: searchState(
        (accessToken: string, params: QueryParameters, filters) => {
            return HttpClient.get("/v1/tvshows", {
                type: TvShowQueryResult,
                accessToken,
                queryParameters: params,
                filters,
            });
        },
        (accessToken: string, title: string) => {
            return HttpClient.get(`/v1/tvshows/search?query=${title}`, {
                type: TvShowSearch,
                accessToken,
            }) as unknown as Promise<TvShowSearch[]>;
        }
    ),

    addToSystemLoading: false,
    addToSystem: thunk(async (actions: Actions<ITvShowState>, payload: TvShowSearch, { getStoreState }) => {
        actions.setAddToSystemLoading(true);

        const response = await HttpClient.post("/v1/tvshows", {
            type: TvShow,
            accessToken: getStoreState().authentication.token.accessToken,
            body: serialize({
                tvdb_id: payload.tvdbId,
                title: payload.title ?? payload.originalTitle,
                year: payload.firstAirDate.year(),
                season_numbers: payload.seasons.map((season) => season.seasonNumber),
                poster_path: payload.posterPath,
            })
        });

        actions.setAddToSystemLoading(false);

        return response;
    }),
    setAddToSystemLoading: action((state: ITvShowState, payload: boolean) => {
        state.addToSystemLoading = payload;
    })
};
