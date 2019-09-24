import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../src/Store/configureStore";

interface IProps {
    Component: React.Component;
    store: any;
}

class MyApp extends App<IProps> {
    public static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    public render(): JSX.Element {
        const { store, Component, pageProps } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(configureStore())(MyApp);
