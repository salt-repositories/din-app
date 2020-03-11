import { Filters, QueryParameters } from "../Models/Querying";

export class ApiClientUtils {
    public static ApplyQueryParametersAndFilters(queryParameters: QueryParameters, filters?: Filters): string {
        let path = "";
        let first = true;

        if (!queryParameters) {
            queryParameters = new QueryParameters();
        }

        const params = Object.entries(queryParameters).concat(Object.entries(filters));

        for (const [name, value] of params) {
            if (value) {
                path += `${first ? "?" : "&"}${name.toLowerCase()}=${value}`;
                first = false;
            }
        }

        return path;
    }
}
