import { serialize } from "class-transformer";
import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { globalContext } from "../../../pages/_app";
import { Token } from "../../Domain/Models/Authentication";
import { HttpClient } from "../../Domain/Utils";

export interface IAuthenticationState {
    token: Token;
    identity: string;
    email: string;

    setToken: Action<IAuthenticationState, Token>;
    setIdentity: Action<IAuthenticationState, string>;
    setEmail: Action<IAuthenticationState, string>;

    getToken: Thunk<IAuthenticationState>;

    loginLoading: boolean;
    setLoginLoading: Action<IAuthenticationState, boolean>;
    login: Thunk<IAuthenticationState, object>;

    refreshToken: Thunk<IAuthenticationState>;
    logout: Thunk<IAuthenticationState>;
    reset: Action<IAuthenticationState>;

    getAuthorizationCodeLoading: boolean;
    setGetAuthorizationCodeLoading: Action<IAuthenticationState, boolean>;
    getAuthorizationCode: Thunk<IAuthenticationState, string>;

    changePasswordLoading: boolean;
    setChangePasswordLoading: Action<IAuthenticationState, boolean>;
    changePassword: Thunk<IAuthenticationState, { email: string, password: string, authorization_code: string }>;
}

export const authenticationState: IAuthenticationState = {
    token: undefined,
    identity: undefined,
    email: undefined,

    setToken: action((state: IAuthenticationState, payload: Token) => {
        if (!payload) {
            destroyCookie(globalContext, "token");
            state.token = undefined;

            return;
        }

        const {Identity, Email} = jwtDecode(payload.accessToken);
        state.token = payload;
        state.identity = Identity;
        state.email = Email;

        destroyCookie(globalContext, "token");
        setCookie(globalContext, "token", serialize(payload, {ignoreDecorators: true}), {
            path: "/",
            sameSite: "strict",
            maxAge: 3600 * 24 * 35,
        });
    }),
    setIdentity: action((state: IAuthenticationState, payload: string) => {
        state.identity = payload;
    }),
    setEmail: action((state: IAuthenticationState, payload: string) => {
        state.email = payload;
    }),

    getToken: thunk((actions: Actions<IAuthenticationState>, _, {getState}) => {
        const state = getState();

        if (state.token) {
            return state.token;
        }

        const serializedToken = parseCookies(globalContext).token;
        return serializedToken
            ? JSON.parse(serializedToken) as Token
            : undefined;
    }),

    loginLoading: false,
    setLoginLoading: action((state: IAuthenticationState, payload: boolean) => {
        state.loginLoading = payload;
    }),
    login: thunk(async (actions: Actions<IAuthenticationState>, payload) => {
        actions.setLoginLoading(true);

        const response = await HttpClient.post("/v1/authentication/token", {
            type: Token,
            noAuth: true
        }, serialize(payload));

        if (response instanceof Token) {
            actions.setToken(response);

            await Router.push("/Home");
        }

        actions.setLoginLoading(false);
    }),

    refreshToken: thunk(async (actions: Actions<IAuthenticationState>) => {
        const currentToken = actions.getToken();

        const newToken = await HttpClient.get(`/auth/refresh/${currentToken.refreshToken}`, {
            type: Token,
            noAuth: true
        });

        if (newToken instanceof Token) {
            actions.setToken(newToken);

            return newToken.accessToken;
        }

        await actions.logout();
    }),

    logout: thunk(async (actions: Actions<IAuthenticationState>) => {
        actions.setToken(undefined);
        destroyCookie(globalContext, "token");

        await Router.push("/");
    }),
    reset: action(() => ({
        ...authenticationState
    })),

    getAuthorizationCodeLoading: false,
    getAuthorizationCode: thunk(async (actions: Actions<IAuthenticationState>, payload: string) => {
        actions.setGetAuthorizationCodeLoading(true);

        await HttpClient.get(`/v1/authentication/authorization_code?email=${payload}`);

        actions.setGetAuthorizationCodeLoading(false);
    }),
    setGetAuthorizationCodeLoading: action((state: IAuthenticationState, payload: boolean) => {
        state.getAuthorizationCodeLoading = payload;
    }),

    changePasswordLoading: false,
    setChangePasswordLoading: action((state: IAuthenticationState, payload: boolean) => {
        state.changePasswordLoading = payload;
    }),
    changePassword: thunk(async (actions: Actions<IAuthenticationState>, payload) => {
        actions.setChangePasswordLoading(true);

        await HttpClient.post("/v1/authentication/change_password", undefined, serialize(payload));

        actions.setChangePasswordLoading(false);
    })
};
