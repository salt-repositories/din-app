import { Store } from "easy-peasy";
import React from "react";
import { initializeStore, IRootState, storeStructure } from "./index";

const isServer = typeof window === "undefined";

const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const getOrCreateStore = (initialState) => {
    if (isServer) {
        return initializeStore(initialState)
    }

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}

interface IState {
    store: Store<IRootState>;
}

export const withStore = (App) => {
    return class AppWithRedux extends React.Component<{}, IState> {
        static async getInitialProps(appContext) {
            const store = getOrCreateStore(storeStructure);
            appContext.ctx.store = store

            let appProps = {}

            if (App.getInitialProps) {
                appProps = await App.getInitialProps(appContext)
            }

            return {
                ...appProps,
                initialReduxState: store.getState(),
            }
        }

        public store: Store<IRootState>;

        constructor(props) {
            super(props)
            this.store = getOrCreateStore(props.initialReduxState)
        }

        render() {
            return <App {...this.props} store={this.store} />
        }
    }
}
