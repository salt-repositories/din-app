
import { Transform, Type } from "class-transformer";
import moment, { Moment } from "moment";
import { Token } from "../Models/Authentication";

/**
 * Wrapper class for token cookie object
 */
export class TokenCookie {
    @Type(() => Token)
    public token: Token;
    @Type(() => Date)
    @Transform((value) => moment(value), { toClassOnly: true })
    public expires: Moment;

    constructor(token: Token, requested: Moment) {
        this.token = token;
        this.expires = requested;
    }
}
