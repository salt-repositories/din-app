import {combinedReducers} from "./reducers";
import {InitialState} from "./states";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

export function configureStore(initialState = InitialState) {
    return createStore(
        combinedReducers,
        initialState,
        composeWithDevTools(applyMiddleware()),
    );
}
