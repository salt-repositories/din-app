import { QueryParameters } from "../Models/Querying";

export class ApiClientUtils {
    public static QueryParamsToPath(queryParameters: QueryParameters): string {
        if (!queryParameters) {
            queryParameters = new QueryParameters();
        }

        return `?skip=${queryParameters.skip}&take=${queryParameters.take}&sortby=${queryParameters.sortBy}&sortdirection=${queryParameters.sortDirection}`;
    }
}
