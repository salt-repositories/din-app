import { Filters, QueryParameters } from "../../../../Models/Querying";
import { TvShowQueryResult } from "../../../../Models/TvShow";
import { ApiClientUtils } from "../../../ApiClientUtils";
import { ApiVersions } from "../../../Versions/Concrete/Versions";
import { Endpoints } from "../../index";

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
}
