import { action, Action, thunk, Thunk } from "easy-peasy";
import { ApiClientProvider } from "../../../Domain/Client";
import { Filters, QueryParameters } from "../../../Domain/Models/Querying";
import { TvShow, TvShowSearch } from "../../../Domain/Models/TvShow";

export interface ITvShowState {
    recentlyAddedTvShows: [TvShow, TvShowSearch][];
    getRecentlyAddedTvShows: Thunk<ITvShowState>;
    addRecentlyAddedTvShow: Action<ITvShowState, [TvShow, TvShowSearch]>;
    filters: Filters;
    queryParams: QueryParameters;
}

export const tvShowState: ITvShowState = {
    recentlyAddedTvShows: [],
    getRecentlyAddedTvShows: thunk(async (actions, _, helpers) => {
        const apiClient = ApiClientProvider.getClient();

        const params = helpers.getState().queryParams;
        const filters = helpers.getState().filters;

        params.sortBy = "Added";
        params.sortDirection = "Desc";
        filters.plex = true;

        const tvShows = await apiClient.v1.tvShows.getTvShows(params, filters);
        const searchTvShows = await Promise.all(
            tvShows.items.map(async (tvShow) => apiClient.v1.tvShows.searchTvShowByQuery(tvShow.title))
        );

        searchTvShows.map((result, index) => {
            actions.addRecentlyAddedTvShow([tvShows.items[index], result[0]]);
        });
    }),
    addRecentlyAddedTvShow: action((state: ITvShowState, payload: [TvShow, TvShowSearch]) => {
        state.recentlyAddedTvShows.push(payload);
    }),
    filters: new Filters(),
    queryParams: new QueryParameters(),
};
