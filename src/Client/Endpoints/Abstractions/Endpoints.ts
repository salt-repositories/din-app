import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import fetch from "isomorphic-unfetch";
import { ApiException } from "../../Exceptions/ApiException";
import { ApiVersions } from "../../Versions/Concrete/Versions";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export abstract class Endpoints {
    private readonly baseUrl: string;
    private readonly version: ApiVersions;
    private readonly endpoint: string;

    protected constructor(version: ApiVersions, endpoint: string) {
        this.baseUrl = process.env.API_URL;
        this.version = version;
        this.endpoint = endpoint;
    }

    protected async call<T>(
        method: Method,
        path: string,
        body?: any,
        returnType?: ClassType<T>,
        returnArray?: boolean,
    ): Promise<T | T[]> {
        const response = await fetch(this.buildUrl(path), {
            body,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method,
        });

        if (!response.ok) {
            throw new ApiException("Api call failed", await response.json());
        }

        return !returnType
            ? null
            : returnArray
                ? plainToClass(returnType, await response.json() as [])
                : plainToClass(returnType, await response.json());
    }

    private buildUrl(path: string): string {
        return `${this.baseUrl}/${this.version}/${this.endpoint}/${path}`;
    }
}
