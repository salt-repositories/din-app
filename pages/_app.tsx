import "reflect-metadata";
import "../public/static/Styles/antd.css";

import { Store, StoreProvider } from "easy-peasy";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
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
        const { store } = ctx;

        globalContext = ctx;
        globalStore = store;

        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return {pageProps};
    }

    public render(): JSX.Element {
        const {store, Component, pageProps, err } = this.props;
        const modifiedPageProps = {...pageProps, ...err};

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
