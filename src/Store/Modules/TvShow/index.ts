import { ApiClientProvider } from "../../../Domain/Client";
import { Filters, QueryParameters } from "../../../Domain/Models/Querying";
import { TvShow, TvShowCalendar } from "../../../Domain/Models/TvShow";
import { calendar, ICalendar, IRecentlyAdded, recentlyAdded } from "../Shared";

export interface ITvShowState {
    recentlyAddedTvShows: IRecentlyAdded<TvShow>;
    calendar: ICalendar<TvShowCalendar>;
    filters: Filters;
    queryParams: QueryParameters;
}

export const tvShowState: ITvShowState = {
    recentlyAddedTvShows: recentlyAdded<TvShow>(
        (params, filters) => {
            const apiClient = ApiClientProvider.getClient();
            return apiClient.v1.tvShows.getTvShows(params, filters);
        },
    ),
    calendar: calendar<TvShowCalendar>(
        (from, till) => {
            const apiClient = ApiClientProvider.getClient();
            return apiClient.v1.tvShows.getCalendar(from, till);
        }
    ),
    filters: new Filters(),
    queryParams: new QueryParameters(),
};
