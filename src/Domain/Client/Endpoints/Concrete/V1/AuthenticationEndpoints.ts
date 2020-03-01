import { Endpoints } from "../../index";
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

        return await this.call("POST", false, "token", JSON.stringify(body), Token) as Token;
    }

    public async getTokenByRefreshToken(refreshToken: string): Promise<Token> {
        return await this.call("GET",false, `refresh/${refreshToken}`, null, Token) as Token;
    }

    public async getAuthorizationCode(email: string): Promise<void> {
        await this.call("GET", false,`authorization_code?email=${email}`);
    }

    public async changeAccountPassword(email: string, password: string, authorizationCode: string) {
        await this.call("POST", false,"change_password", JSON.stringify( {
            email,
            password,
            authorization_code: authorizationCode,
        }));
    }
}
