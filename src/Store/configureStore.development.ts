import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combinedReducers } from "./reducers";
import { InitialState } from "./states";

export function configureStore(initialState = InitialState) {
    return createStore(
        combinedReducers,
        initialState,
        composeWithDevTools(applyMiddleware()),
    );
}
