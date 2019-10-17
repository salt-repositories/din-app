import { Filters, QueryParameters } from "../Models/Querying";

export class ApiClientUtils {
    public static ApplyQueryParametersAndFilters(queryParameters: QueryParameters, filters?: Filters): string {
        if (!queryParameters) {
            queryParameters = new QueryParameters();
        }

        const path = `?skip=${queryParameters.skip}&take=${queryParameters.take}&sortby=${queryParameters.sortBy}&sortdirection=${queryParameters.sortDirection}`;

        if (!filters) {
            return path;
        }

        return path + `&title=${filters.title}&status=${filters.status}&downloaded=${filters.downloaded}&year=${filters.year}`;
    }
}
