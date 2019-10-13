import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import fetch from "isomorphic-unfetch";
import { getToken } from "../../../Authentication/Authentication";
import { logException } from "../../../Utils/Analytics";
import { ApiException } from "../../Exceptions/ApiException";
import { ApiVersions } from "../../Versions/Concrete/Versions";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export abstract class Endpoints {
    public static token: string;
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
        secure: boolean,
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
                "Authorization": secure ? `Bearer ${(await getToken()).accessToken}` : null,
            },
            method,
        });

        if (!response.ok) {
            let jsonResponse = null;

            try {
                jsonResponse = await response.json();
            } catch (error) {
                logException(error.message, true);
            }

            logException(JSON.stringify(jsonResponse), true);
            throw new ApiException("API call failed", jsonResponse);
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
