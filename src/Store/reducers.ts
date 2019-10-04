import { combineReducers } from "redux";
import mainReducers from "./Main/reducers";
import { IInitialState } from "./states";

export const combinedReducers = combineReducers<IInitialState>({
    main: mainReducers,
});
