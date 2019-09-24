import { Endpoints } from "../..";
import { Token } from "../../../../Models";
import { ApiVersions } from "../../../Versions/Concrete/Versions";

export class AuthenticationEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "authentication");
    }

    public async getTokenByCredentials(username: string, password): Promise<Token> {
        const body = username.includes("@")
            ? {
                email: username,
                password,
            }
            : {
                username,
                password,
            };

        return await this.call("POST", "token", JSON.stringify(body), Token) as Token;
    }

    public async getTokenByRefreshToken(refreshToken: string) {
        throw new Error("Not yet implemented");
    }

    public async getAuthorizationCode(email: string): Promise<void> {
        await this.call("GET", `authorization_code?email=${email}`);
    }

    public async changeAccountPassword(email: string, password: string, authorizationCode: string) {
        await this.call("POST", "change_password", JSON.stringify( {
            email,
            password,
            authorization_code: authorizationCode,
        }));
    }
}
