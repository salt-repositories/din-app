import { serialize } from "class-transformer";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React from "react";
import { IRootState } from "../../Store";
import { AppContext } from "../../Store/AppContext";
import { Token } from "../Models/Authentication";
import { HttpClient } from "../Utils";

export const withAuthentication = (Page) => {
    return class extends React.Component {
        public static async getInitialProps(context: AppContext) {
            await handleAuthentication(context);

            if (Page.getInitialProps) {
                return Page.getInitialProps(context);
            }

            return {};
        }

        public render() {
            return <Page {...this.props}/>;
        }
    };
};

const handleAuthentication = async (context: AppContext) => {
    const token = getToken(context);

    if (!token) {
        return redirectToLogin(context);
    }

    // Validate access token
    if (validateToken(context, token)) {
        return redirectToHome(context);
    }

    // Try refreshing token
    console.log("refresh");
    const newToken = await HttpClient.get(`/v1/authentication/refresh/${token.refreshToken}`, {
        type: Token,
    });

    if (!newToken) {
        console.log("invalid refresh token");
        return redirectToLogin(context);
    }

    if (validateToken(context, newToken, true)) {
        return redirectToHome(context);
    }

    throw Error("HandleAuthentication failed");
};

const getToken = (context: AppContext): Token => {
    if (context) {
        const state: IRootState = context.store.getState();

        if (state.authentication.token) {
            console.log("get token from state");
            return state.authentication.token;
        }
    }

    console.log("get token from cookie");

    const serializedToken = parseCookies(context).token;
    return serializedToken
        ? JSON.parse(serializedToken) as Token
        : undefined;
};

const setToken = ( context: AppContext, token: Token, renewCookie: boolean = false): void => {
    const { Identity, Email } = jwtDecode(token.accessToken);

    context.store.dispatch.authentication.setToken(token);
    context.store.dispatch.authentication.setIdentity(Identity);
    context.store.dispatch.authentication.setEmail(Email);

    if (renewCookie) {
        destroyCookie(context, "token");
        setCookie(context, "token", serialize(token, { ignoreDecorators: true }), {
            maxAge: 3600 * 24 * 35,
        });
    }
};

const validateToken = (context: AppContext, token: Token, renewCookie: boolean = false): boolean => {
    const now = moment();
    const { exp } = jwtDecode(token.accessToken);

    if (now < moment.unix(exp)) {
        console.log("auth");
        setToken(context, token, renewCookie);

        return true;
    }

    return false;
};

const redirectToLogin = (context: AppContext) => {
    if (context.pathname !== "/") {
        context.res.writeHead(302, { Location: "/" });
        context.res.end();
    }
};

const redirectToHome = (context: AppContext) => {
    if (context.pathname === "/") {
        context.res.writeHead(302, { Location: "/Home" });
        context.res.end();
    }
};
