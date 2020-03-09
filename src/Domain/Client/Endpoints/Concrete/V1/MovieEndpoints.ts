import { Endpoints } from "../..";
import { Filters, Movie, MovieQueryResult, MovieSearch, QueryParameters } from "../../../../Models";
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

    public async getCalendar(from: string, till: string): Promise<Movie[]> {
        return await this.call(
            "GET",
            true,
            `calendar?from=${from}&till=${till}`,
            null,
            Movie,
            true,
        ) as Movie[];
    }
}
