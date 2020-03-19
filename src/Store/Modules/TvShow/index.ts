import { ApiClientProvider } from "../../../Domain/Client";
import { TvShow, TvShowCalendar } from "../../../Domain/Models/TvShow";
import { calendar, ICalendar, IRecentlyAdded, recentlyAdded } from "../Shared";
import { contentState, IContent } from "../Shared/content";

export interface ITvShowState {
    recentlyAddedTvShows: IRecentlyAdded<TvShow>;
    calendar: ICalendar<TvShowCalendar>;
    tvShows: IContent<TvShow>;
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
    tvShows: contentState(
        (params, filters) => {
            const apiClient = ApiClientProvider.getClient();
            return apiClient.v1.tvShows.getTvShows(params, filters);
        },
        (id) => {
            const apiClient = ApiClientProvider.getClient();
            return apiClient.v1.tvShows.getTvShowById(id, true, true);
        }
    )
};
