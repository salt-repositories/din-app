import { TvShow, TvShowCalendar, TvShowQueryResult } from "../../Domain/Models/TvShow";
import { HttpClient } from "../../Domain/Utils";
import { calendar, ICalendar, IRecentlyAdded, recentlyAdded } from "../Shared";
import { contentState, IContent } from "../Shared/content";

export interface ITvShowState {
    recentlyAddedTvShows: IRecentlyAdded<TvShow>;
    calendar: ICalendar<TvShowCalendar>;
    tvShows: IContent<TvShow>;
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
    )
};
