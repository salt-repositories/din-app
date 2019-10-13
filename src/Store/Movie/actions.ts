import actionCreatorFactory from "typescript-fsa";
import { Movie, MovieSearch } from "../../Models/Movies";

const actionCreator = actionCreatorFactory("Movie");

export const MovieActions = {
    setRecentlyAddedMovies: actionCreator<Array<[Movie, MovieSearch]>>("SET_RECENTLY_ADDED_MOVIES"),
};
