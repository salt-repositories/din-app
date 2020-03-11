import { Endpoints } from "../..";
import { Filters, QueryParameters } from "../../../../Models/Querying";
import { TvShowCalendar, TvShowQueryResult, TvShowSearch } from "../../../../Models/TvShow";
import { ApiClientUtils } from "../../../ApiClientUtils";
import { ApiVersions } from "../../../Versions/Concrete/Versions";

export class TvShowEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "tvshows");
    }
    
    public async getTvShows(queryParameters: QueryParameters, filters?: Filters): Promise<TvShowQueryResult> {
        return await this.call(
            "GET",
            true,
            ApiClientUtils.ApplyQueryParametersAndFilters(queryParameters, filters),
            null,
            TvShowQueryResult,
            false,
        ) as TvShowQueryResult;
    }
    
    public async searchTvShowByQuery(query: string): Promise<TvShowSearch[]> {
        return await this.call(
            "GET",
            true,
            `search?query=${query}`,
            null,
            TvShowSearch,
            true,
        ) as TvShowSearch[];
    }

    public async getCalendar(from: string, till: string): Promise<TvShowCalendar[]> {
        return await this.call(
            "GET",
            true,
            `calendar?from=${from}&till=${till}`,
            null,
            TvShowCalendar,
            true,
        ) as TvShowCalendar[];
    }
}
