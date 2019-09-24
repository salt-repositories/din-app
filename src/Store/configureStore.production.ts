import { applyMiddleware, createStore } from "redux";
import { combinedReducers } from "./reducers";
import { InitialState } from "./states";

export function configureStore(initialState = InitialState) {
    return createStore(combinedReducers, initialState, applyMiddleware());
}
