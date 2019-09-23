import { Endpoints } from "..";
import { Token } from "../../../Models";
import {ApiVersions} from "../../Versions/Concrete/Versions";

export class AuthenticationEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "authentication");
    }

    public async getTokenByCredentials(username: string, password: string): Promise<Token> {
        throw new Error("Not yet implemented");
    }

    public async getTokenByRefreshToken(refreshToken: string) {
        throw new Error("Not yet implemented");
    }
}
