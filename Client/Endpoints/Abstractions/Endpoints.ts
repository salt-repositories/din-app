import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import fetch from "isomorphic-unfetch";

export abstract class Endpoints {
    private baseUrl: string;
    private version: string;
    private endpoint: string;

    constructor(version: string, endpoint: string) {
        this.baseUrl = "https://api-nightly.thedin.nl";
        this.version = version;
        this.endpoint = endpoint;
    }

    protected async call<T>(path: string, type: ClassType<T>, array?: boolean): Promise<T | T[]> {
        const options: RequestInit = {
            headers: {
                "User-Agent": "DinApp",
            },
            method: "get",
        };

        const response = await this.performRequest(`${this.buildUrl(path)}`, options);

        return (array && true)
            ? plainToClass(type, await response.json() as [])
            : plainToClass(type, await response.json());
    }

    private async performRequest(url: string, options: RequestInit): Promise<Response> {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("Api call failed");
        }

        return response;
    }

    private buildUrl(path: string): string {
        return `${this.baseUrl}/${this.version}/${this.endpoint}/${path}`;
    }
}
