import { IMovieState } from "./states";

export const recentlyAddedMoviesSelector = (state: IMovieState) =>
    state.recentlyAddedMovies;
