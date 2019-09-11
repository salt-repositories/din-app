import { IInitialState } from "./states";
import { combineReducers } from "redux";
import homeReducers from "./Home/reducers";

export const combinedReducers = combineReducers<IInitialState>({
    home: homeReducers,
});
