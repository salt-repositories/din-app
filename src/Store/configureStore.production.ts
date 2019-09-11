import {combinedReducers} from "./reducers";
import {InitialState} from "./states";
import {applyMiddleware, createStore} from "redux";

export function configureStore(initialState = InitialState) {
    return createStore(combinedReducers, initialState, applyMiddleware());
}
