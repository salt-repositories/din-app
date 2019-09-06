import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunkMiddleware from "redux-thunk";
import Reducers from "./Reducers";

export default () => {
    return createStore(Reducers, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};
