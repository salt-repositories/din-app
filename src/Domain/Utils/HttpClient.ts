import { message } from "antd";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { globalStore } from "../../../pages/_app";
import { ValidationError } from "../Models/Exeptions";
import { QueryParameters } from "../Models/Querying";

type Method = "GET" | "POST" | "DELETE" | "PATCH";

export interface IRequestParameters<T> {
    type?: ClassType<T>;
    accessToken?: string;
    queryParameters?: QueryParameters;
    filters?: any;
}

export class HttpClient {
    private static headers: HeadersInit = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    public static get<T>(path: string, params?: IRequestParameters<T>): Promise<T> {
        return this.request("GET", path, params) as Promise<T>;
    }

    public static post<T>(path: string, params: IRequestParameters<T>, body: string): Promise<T | ValidationError[]> {
        return this.request("POST", path, params, body) as Promise<T | ValidationError[]>;
    }

    public static patch<T>(path: string, params: IRequestParameters<T>, body: string): Promise<T | ValidationError[]> {
        return this.request("PATCH", path, params, body) as Promise<T | ValidationError[]>;
    }

    public static delete<T>(path: string, params: IRequestParameters<T>): Promise<void> {
        return this.request("DELETE", path, params) as Promise<void>;
    }

    private static async request<T>(method: Method, path: string, params: IRequestParameters<T> = {}, body?: string): Promise<void | T | ValidationError[]> {
        try {
            let requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${path}`;

            if (params.accessToken) {
                this.headers = {
                    ...this.headers,
                    "Authorization": `Bearer ${params.accessToken}`
                };
            }

            if (params.queryParameters) {
                requestUrl = this.buildHttpQueryParameters(requestUrl, params.queryParameters)
            }

            if (params.filters) {
                requestUrl = this.buildHttpQueryParameters(requestUrl, params.filters)
            }

            const response = await fetch(requestUrl, {
                headers: this.headers,
                method,
                body: body ?? null
            });

            if (response.status === 401 && params.accessToken) {
                console.log("token expired on cold new request ---> refreshing")

                const newToken = await globalStore.dispatch.authentication.refreshToken();

                if (newToken) {
                    return await this.request(method, path, {
                        ...params,
                        accessToken: newToken,
                    }, body);
                }

                return;
            }

            if (response.status < 200 || response.status > 299) {
                let responseBody;

                try {
                    responseBody = await response.json();
                } catch (error) {
                    if (process.browser) {
                        message.error(`Unexpected HTTP status code ${response.status}`);
                    }

                    return;
                }

                if (responseBody.message) {
                    if (process.browser) {
                        message.error(responseBody.message);
                    }

                    if (responseBody.errors) {
                        const validationErrors = plainToClass(ValidationError, responseBody.errors as []);

                        if (!Array.isArray(validationErrors)) {
                            throw new Error("Unknown error response")
                        }

                        return validationErrors;
                    }
                }
            }

            if (response.status === 204) {
                return;
            }

            return params.type
                ? plainToClass(params.type, await response.json())
                : await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    private static buildHttpQueryParameters(url: string, object: any) {
        const qp = Object.entries(object);

        for (const [name, value] of qp) {
            if (value || (Array.isArray(value) && value.length)) {
                url += `${!url.includes("?") ? "?" : "&"}${name.toLowerCase()}=${value}`;
            }
        }

        return url;
    }
}
