import { serialize } from "class-transformer";
import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { Token } from "../../Domain/Models/Authentication";
import { HttpClient } from "../../Domain/Utils";

export interface IAuthenticationState {
    token: Token;
    identity: string;
    email: string;

    setToken: Action<IAuthenticationState, Token>;
    setIdentity: Action<IAuthenticationState, string>;
    setEmail: Action<IAuthenticationState, string>;

    loginLoading: boolean;
    setLoginLoading: Action<IAuthenticationState, boolean>;
    login: Thunk<IAuthenticationState, { username: string, password: string }>;

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
        state.token = payload;
    }),
    setIdentity: action((state: IAuthenticationState, payload: string) => {
        state.identity = payload;
    }),
    setEmail: action((state: IAuthenticationState, payload: string) => {
        state.email = payload;
    }),

    loginLoading: false,
    setLoginLoading: action((state: IAuthenticationState, payload: boolean) => {
        state.loginLoading = payload;
    }),
    login: thunk(async (actions: Actions<IAuthenticationState>, payload) => {
        actions.setLoginLoading(true);

        const response = await HttpClient.post("/v1/authentication/token", {
            type: Token,
            body: serialize(payload)
        });

        if (response instanceof Token) {
            const { Identity, Email } = jwtDecode(response.accessToken);
            actions.setIdentity(Identity);
            actions.setEmail(Email);

            setCookie(undefined, "token", serialize(response, { ignoreDecorators: true }), {
                maxAge: 3600 * 24 * 35,
            });

            await Router.push("/Home");
        }

        actions.setLoginLoading(false)
    }),

    logout: thunk(async (actions: Actions<IAuthenticationState>) => {
        actions.setToken(undefined);
        destroyCookie(undefined, "token");
        Router.push("/");
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

        await HttpClient.post("/v1/authentication/change_password", {
            type: null,
            body: serialize(payload),
        });

        actions.setChangePasswordLoading(false);
    })
};
