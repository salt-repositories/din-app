import { Expose } from "class-transformer";

export class Token {
    @Expose({name: "access_token"})
    public accessToken: string;
    @Expose({name: "expires_in"})
    public expiresIn: number;
    @Expose({name: "refresh_token"})
    public refreshToken: string;
    @Expose({name: "token_type"})
    public tokenType: string;
}
