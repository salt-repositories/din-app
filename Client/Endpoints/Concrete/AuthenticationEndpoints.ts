import { Token } from "../../../Models";
import { Endpoints } from "../../Endpoints";

export class AuthenticationEndpoints extends Endpoints {
    constructor(version: string) {
        super(version, "authentication");
    }

    public async getTokenByCredentials(username: string, password: string): Promise<Token> {
        throw new Error("Not yet implemented");
    }

    public async getTokenByRefreshToken(refreshToken: string) {
        throw new Error("Not yet implemented");
    }
}
