import "reflect-metadata";

import { Store, StoreProvider } from "easy-peasy";
import withRedux from "next-redux-wrapper";
import App from "next/app";
import { default as nextRouter } from 'next/router'
import React from "react";
import { initializeStore, IRootState } from "../src/Store";

export const redirect = (ctx, path) => {
    if (process.browser) {
        nextRouter.push(path)
    } else {
        ctx.res.writeHead(301, { Location: path });
        ctx.res.end()
    }
};

interface IProps {
    Component: React.Component;
    store: Store<IRootState>;
}

class MyApp extends App<IProps> {
    public static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return {pageProps};
    }

    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        const {store, Component, pageProps} = this.props;

        return (
            <StoreProvider store={store}>
                <Component {...pageProps} />
            </StoreProvider>
        );
    }
}

export default withRedux(initializeStore)(MyApp);
