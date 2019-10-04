import { Endpoints } from "../..";
import { QueryParameters, QueryResult } from "../../../../Models/Querying";
import { TvShow } from "../../../../Models/TvShow";
import { ApiClientUtils } from "../../../ApiClientUtils";
import { ApiVersions } from "../../../Versions/Concrete/Versions";

export class TvShowEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "tvshows");
    }
    
    public async getTvShows(queryParameters: QueryParameters, title?: string): Promise<QueryResult<TvShow>> {
        return await this.call(
            "GET",
            true,
            `${ApiClientUtils.QueryParamsToPath(queryParameters)}&title=${title ? title : ""}`,
            null,
            QueryResult,
            false,
        ) as QueryResult<TvShow>;
    }
}
