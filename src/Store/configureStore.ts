import { InitialState } from "./states";

const configureStoreComponent = (() => {
    return process.env.NODE_ENV === "production"
        ? require("./configureStore.production")
        : require("./configureStore.development");
})();

export const configureStore = (initialState = InitialState) => (
    state = initialState,
) => configureStoreComponent.configureStore(state);
