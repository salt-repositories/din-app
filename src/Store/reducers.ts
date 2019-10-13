import { combineReducers } from "redux";
import componentsReducers from "./Components/reducers";
import mainReducers from "./Main/reducers";
import movieReducers from "./Movie/reducers";
import { IInitialState } from "./states";

export const combinedReducers = combineReducers<IInitialState>({
    main: mainReducers,
    movie: movieReducers,
    components: componentsReducers,
});
