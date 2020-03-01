import { Endpoints } from "../../index";
import { Filters, MovieQueryResult, MovieSearch, QueryParameters } from "../../../../Models";
import { ApiClientUtils } from "../../../ApiClientUtils";
import { ApiVersions } from "../../../Versions/Concrete/Versions";

export class MovieEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "movies");
    }

    public async getMovies(queryParameters: QueryParameters, filters?: Filters): Promise<MovieQueryResult> {
        return await this.call(
            "GET",
            true,
            ApiClientUtils.ApplyQueryParametersAndFilters(queryParameters, filters),
            null,
            MovieQueryResult,
            false,
        ) as MovieQueryResult;
    }

    public async searchMovieByQuery(query: string): Promise<MovieSearch[]> {
        return await this.call(
            "GET",
            true,
            `search?query=${query}`,
            null,
            MovieSearch,
            true,
        ) as MovieSearch[];
    }
}
