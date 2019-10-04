import { Endpoints } from "../..";
import { Movie, QueryParameters, QueryResult } from "../../../../Models";
import { ApiClientUtils } from "../../../ApiClientUtils";
import { ApiVersions } from "../../../Versions/Concrete/Versions";

export class MovieEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "movies");
    }

    public async getMovies(queryParameters: QueryParameters, title?: string): Promise<QueryResult<Movie>> {
        return await this.call(
            "GET",
            true,
            `${ApiClientUtils.QueryParamsToPath(queryParameters)}&title=${title ? title : ""}`,
            null,
            QueryResult,
            false,
        ) as QueryResult<Movie>;
    }
}
