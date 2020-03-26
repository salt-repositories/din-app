import { deserialize, plainToClass, serialize } from "class-transformer";
import jwtDecode from "jwt-decode";
import moment from "moment";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { globalContext } from "../../../pages/_app";
import { AppContext } from "../../Store/AppContext";
import { ApiClientProvider } from "../Client";
import { Token } from "../Models";
import { logException } from "../Utils";

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
        const token: Token = deserialize(Token, parseCookies(context).token);
        const {exp} = jwtDecode(token.accessToken);

        /**
         * Check if the token is set and not expired. (redirect to Home of the path is root)
         * @return authenticated
         */
        if (token.accessToken && now < moment.unix(exp)) {
            console.log("auth");
            if (context.pathname === "/") {
                context.res.writeHead(302, {Location: "/Home"});
                context.res.end();
            }

            return;
        }

        /**
         * Try to get a new token with the current refresh token
         */
        await authenticateWithRefreshToken(token.refreshToken, context);

        if (context.pathname === "/") {
            context.res.writeHead(302, {Location: "/Home"});
            context.res.end();
        }

        return;
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
    context
        ? setCookie(context, "token", serialize(token), {
            maxAge: 3600 * 24 * 35,
        })
        : setCookie({}, "token", serialize(token), {
            maxAge: 3600 * 24 * 35,
        });
};

/**
 * Get the token cookie
 * @return {Promise<Token>} token
 */
export const getToken = async (): Promise<Token> => {
    const now = moment();

    const token = globalContext?.isServer
        ? plainToClass(Token, JSON.parse(parseCookies(globalContext).token))
        : plainToClass(Token, JSON.parse(parseCookies().token));

    const {exp} = jwtDecode(token.accessToken);

    if (token.accessToken && now < moment.unix(exp)) {
        return token;
    }

    try {
        return await authenticateWithRefreshToken(token.refreshToken);
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
