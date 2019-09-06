import { IApp } from "@Interfaces";
import store from "@Redux/store";
import withRedux from "next-redux-wrapper";
import App, { AppContext, Container } from "next/app";
import * as React from "react";
import { Provider } from "react-redux";

class MyApp extends App<IApp.IProps> {
    public static async getInitialProps(props: AppContext) {
        let pageProps = {};

        if (props.Component.getInitialProps) {
            pageProps = await props.Component.getInitialProps(props.ctx);
        }

        return { pageProps };
    }

    public render(): JSX.Element {
        const { Component, pageProps, reduxStore } = this.props;

        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(store)(MyApp);
