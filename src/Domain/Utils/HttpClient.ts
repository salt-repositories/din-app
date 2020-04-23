import * as Sentry from "@sentry/node";
import { message } from "antd";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import fetch from "isomorphic-unfetch";
import { ValidationError } from "../Models/Exeptions";
import { QueryParameters } from "../Models/Querying";

type Method = "GET" | "POST" | "DELETE" | "PATCH";

export interface IRequestParameters<T> {
    type?: ClassType<T>;
    accessToken?: string;
    body?: string;
    queryParameters?: QueryParameters;
    filters?: any;
}

export class HttpClient {
    private static headers: HeadersInit = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    public static async get<T>(url: string, params?: IRequestParameters<T>): Promise<T> {
        return this.request("GET", url, params) as Promise<T>;
    }

    public static async post<T>(url: string, params: IRequestParameters<T>): Promise<T | ValidationError[]> {
        return this.request("POST", url, params);
    }

    public static async patch<T>(url: string, params: IRequestParameters<T>): Promise<T | ValidationError[]> {
        return this.request("PATCH", url, params);
    }

    public static async delete<T>(url: string, params?: IRequestParameters<T>): Promise<T> {
        return this.request("DELETE", url, params) as Promise<T>;
    }

    private static async request<T>(method: Method, url: string, params: IRequestParameters<T> = {}): Promise<T | ValidationError[]> {
        try {
            url = `${process.env.API_URL}${url}`;

            if (params.accessToken) {
                this.headers = {
                    ...this.headers,
                    "Authorization": `Bearer ${params.accessToken}`
                };
            }

            if (params.queryParameters) {
                const qp = Object.entries(params.queryParameters).concat(Object.entries(params.filters));
                let first = true;

                for (const [name, value] of qp) {
                    if (value) {
                        url += `${first ? "?" : "&"}${name.toLowerCase()}=${value}`;
                        first = false;
                    }
                }
            }

            const response = await fetch(url, {
                headers: this.headers,
                method,
                body: params.body ?? null
            });

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
                        return plainToClass(ValidationError, responseBody.errors as []);
                    }

                    return;
                }
            }

            return params.type
                ? plainToClass(params.type, await response.json())
                : null;
        } catch (error) {
            console.log(error);
            Sentry.captureException(error);
        }
    }
}
