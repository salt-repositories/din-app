import jwtDecode from "jwt-decode";
import moment from "moment";
import React from "react";
import { globalStore } from "../../../pages/_app";
import { AppContext } from "../../Store/AppContext";
import { Token } from "../Models/Authentication";

export const withAuthentication = (Page) => {
    return class extends React.Component {
        public static async getInitialProps(context: AppContext) {
            if (!await handleAuthentication(context)) {
                // Make an exception for the login page
                if (context.asPath === "/") {
                    return Page.getInitialProps(context);
                }

                return;
            }

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

const handleAuthentication = async (context: AppContext): Promise<boolean> => {
    const token = context.store.dispatch.authentication.getToken();

    if (!token) {
        return redirectToLogin(context);
    }

    // Validate access token
    if (validateToken(context, token)) {
        return redirectToHome(context);
    }

    // Try refreshing token
    console.log("refresh");
    if (await globalStore.dispatch.authentication.refreshToken()) {
        return redirectToHome(context);
    }

    throw Error("HandleAuthentication failed");
};

const validateToken = (context: AppContext, token: Token): boolean => {
    const now = moment();
    const { exp } = jwtDecode(token.accessToken);

    if (now < moment.unix(exp)) {
        console.log("auth");
        context.store.dispatch.authentication.setToken(token);

        return true;
    }

    return false;
};

const redirectToLogin = (context: AppContext) => {
    if (context.pathname !== "/") {
        context.res.writeHead(302, { Location: "/" });
        context.res.end();
    }

    return false;
};

const redirectToHome = (context: AppContext) => {
    if (context.pathname === "/") {
        context.res.writeHead(302, { Location: `/Home` });
        context.res.end();
    }

    return true;
};

