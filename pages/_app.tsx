import "reflect-metadata";

import * as Sentry from '@sentry/node';
import { Store, StoreProvider } from "easy-peasy";
import { IncomingMessage } from "http";
import get from 'lodash.get';
import withRedux from "next-redux-wrapper";
import App from "next/app";
import { parseCookies } from "nookies";
import React, { ErrorInfo } from "react";
import "../src/Domain/Utils/Sentry";
import { initializeStore, IRootState } from "../src/Store";
import { AppContext } from "../src/Store/AppContext";

export let globalContext: AppContext;

interface IProps {
    Component: React.Component;
    store: Store<IRootState>;
    err: Error;
}
const fileLabel = 'pages/_app';

class MyApp extends App<IProps> {
    public static async getInitialProps(props) {
        const {ctx, Component} = props;
        const {req} = ctx;

        globalContext = ctx;

        Sentry.configureScope((scope) => {
            scope.setContext('cookies', parseCookies(ctx));
        });

        Sentry.addBreadcrumb({
            category: fileLabel,
            message: `Preparing app (${process.browser ? 'browser' : 'server'})`,
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
        const {store, Component, pageProps, err, router} = this.props;
        const modifiedPageProps = {...pageProps, ...err};

        Sentry.configureScope((scope) => {
            scope.setContext('router', {
                route: router.route,
                pathname: router.pathname,
                query: router.query,
                asPath: router.asPath,
            });
        });

        Sentry.addBreadcrumb({
            category: fileLabel,
            message: `Rendering app for Component "${get(Component, 'name', 'unknown')}" (${process.browser ? 'browser' : 'server'})`,
            level: Sentry.Severity.Debug,
        });

        return (
            <StoreProvider store={store}>
                <Component {...modifiedPageProps} />
            </StoreProvider>
        );
    }
}

export default withRedux(initializeStore)(MyApp);
