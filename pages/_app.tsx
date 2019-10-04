import "reflect-metadata";

import withRedux from "next-redux-wrapper";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../src/Store/configureStore";

interface IProps {
    Component: React.Component;
    store: any;
}

class MyApp extends App<IProps> {
    public render(): JSX.Element {
        const { store, Component, pageProps } = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default withRedux(configureStore())(MyApp);
