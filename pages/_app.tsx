import "reflect-metadata";
import "../public/static/Styles/antd.css";

import * as Sentry from "@sentry/node";
import { Store, StoreProvider } from "easy-peasy";
import { IncomingMessage } from "http";
import get from 'lodash.get';
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { parseCookies } from "nookies";
import NProgress from "nprogress";
import React, { ErrorInfo } from "react";
import "../src/Domain/Utils/Sentry";
import { IRootState } from "../src/Store";
import { AppContext } from "../src/Store/AppContext";
import { withStore } from "../src/Store/withStore";

export let globalContext: AppContext;
export let globalStore: Store<IRootState>;

interface IProps {
    Component: React.Component;
    store: Store<IRootState>;
    err: Error;
}

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());

class MyApp extends App<IProps> {
    public static async getInitialProps(props) {
        const {ctx, Component} = props;
        const { store, req } = ctx;

        globalContext = ctx;
        globalStore = store;

        Sentry.configureScope((scope) => {
            scope.setContext("cookies", parseCookies(ctx));
            scope.setContext("currentUser", {
                ["identity"]: (store as Store<IRootState>).getState().authentication.identity,
            });
        });

        Sentry.addBreadcrumb({
            category: "pages/_app",
            message: `Preparing app (${process.browser ? "browser" : "server"})`,
            level: Sentry.Severity.Debug,
        });

        if (req) {
            const { headers }: IncomingMessage = req;

            Sentry.configureScope((scope) => {
                scope.setContext('headers', headers);
            });
        }

        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return {pageProps};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        Sentry.withScope((scope) => {
            Object.keys(errorInfo).forEach((key) => {
                scope.setExtra(key, errorInfo[key]);
            });

            Sentry.captureException(error);
        });

        super.componentDidCatch(error, errorInfo);
    }

    public render(): JSX.Element {
        const {store, Component, pageProps, err, router } = this.props;
        const modifiedPageProps = {...pageProps, ...err};

        Sentry.configureScope((scope) => {
            scope.setContext("router", {
                route: router.route,
                pathname: router.pathname,
                query: router.query,
                asPath: router.asPath,
            });
        });

        Sentry.addBreadcrumb({
            category: "pages/_app",
            message: `Rendering app for Component "${get(Component, 'name', 'unknown')}" (${process.browser ? 'browser' : 'server'})`,
            level: Sentry.Severity.Debug,
        });

        return (
            <>
                <Head>
                    <link rel="stylesheet" type="text/css" href="/static/Styles/nprogress.css" />
                    <title>DIN</title>
                </Head>
                <StoreProvider store={store}>
                    <Component {...modifiedPageProps} />
                </StoreProvider>
            </>
        );
    }
}

export default withStore(MyApp);
