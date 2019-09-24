import { combineReducers } from "redux";
import homeReducers from "./Home/reducers";
import { IInitialState } from "./states";

export const combinedReducers = combineReducers<IInitialState>({
    home: homeReducers,
});
