import { deserialize, plainToClass, serialize } from "class-transformer";
import moment from "moment";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ApiClientProvider } from "../Client";
import { AppContext } from "../Context/AppContext";
import { Token } from "../Models";
import { logException } from "../Utils/Analytics";
import { TokenCookie } from "./TokenCookie";


/**
 * Check validity of current token cookie and reauthenticate if needed
 * @param context
 */
export const HandleAuthentication = async (context: AppContext) => {
    const now = moment();

    /**
     * Read token from cookie and start authentication process
     * @return authenticated
     * @catch cookie is null redirect to login
     */
    try {
        const tokenCookie: TokenCookie = deserialize(TokenCookie, parseCookies(context).token);

        /**
         * Check if the token is set and not expired. (redirect to Home of the path is root)
         * @return authenticated
         */
        if (tokenCookie.token && now < tokenCookie.expires) {
            console.log("auth");
            if (context.pathname === "/") {
                context.res.writeHead(302, {Location: "/Home"});
                context.res.end();
            }

            return;
        }

        /**
         * Check if the token is properly set
         * @return redirect to login (the token is empty)
         */
        if (!tokenCookie.token || !tokenCookie.expires) {
            destroyCookie(context, "token");

            await redirectToLogin(context);
        }

        /**
         * Try to get a new token with the current refresh token
         */
        await authenticateWithRefreshToken(tokenCookie.token.refreshToken, context);
    } catch (error) {
        logException(error.message, false);
        await redirectToLogin(context);
    }
};

/**
 * Set the token cookie
 * @param token
 * @param context
 */
export const setTokenCookie = (token: Token, context?: AppContext) => {
    const expires = moment();
    expires.add(token.expiresIn, "seconds");

    context
        ? setCookie(context, "token", serialize(new TokenCookie(token, expires)), {})
        : setCookie({}, "token", serialize(new TokenCookie(token, expires)), {});
};

/**
 * Get the token cookie
 * @param context
 * @return {Promise<Token>} token
 */
export const getToken = async (context?: AppContext): Promise<Token> => {
    const now = moment();
    const tokenCookie: TokenCookie = context
            ? plainToClass(TokenCookie, parseCookies(context).token)
            : plainToClass(TokenCookie, JSON.parse(parseCookies().token));

    if (tokenCookie.token && now < tokenCookie.expires) {
        return tokenCookie.token;
    }

    try {
        return await authenticateWithRefreshToken(tokenCookie.token.refreshToken);
    } catch (error) {
        logException(error.message, false);

        await redirectToLogin();
    }
};

/**
 * Performs authentication by refreshing the current token
 * @param refreshToken
 * @param context
 * @return {Promise<Token>} token
 */
const authenticateWithRefreshToken = async (refreshToken: string, context?: AppContext): Promise<Token> => {
    const apiClient = ApiClientProvider.getClient();

    try {
        console.log("refresh");
        const response = await apiClient.v1.authentication.getTokenByRefreshToken(refreshToken);

        context
            ? setTokenCookie(response, context)
            : setTokenCookie(response);

        return response;
    } catch (error) {
        logException(error.message, false);

        context
            ? destroyCookie(context, "token")
            : destroyCookie({}, "token");

        context
            ? await redirectToLogin(context)
            : await redirectToLogin();
    }
};

/**
 * Redirect to login by context or router
 * @param context
 */
const redirectToLogin = async (context?: AppContext): Promise<void> => {
    if (!context) {
        if (Router.pathname !== "/") {
            await Router.push("/");
        }

        return;
    }

    if (context.pathname !== "/") {
        context.res.writeHead(302, {Location: "/"});
        context.res.end();
    }
};
