import "reflect-metadata";

import { Store, StoreProvider } from "easy-peasy";
import withRedux from "next-redux-wrapper";
import App from "next/app";
import React from "react";
import { initializeStore } from "../src/Store";

interface IProps {
    Component: React.Component;
    store: Store;
}

class MyApp extends App<IProps> {
    public static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return {pageProps};
    }

    public store: Store;

    constructor(props) {
        super(props);
        this.store = props.store;
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
