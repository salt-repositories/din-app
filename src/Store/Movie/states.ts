import { Movie, MovieSearch } from "../../Models/Movies";

export interface IMovieState {
    recentlyAddedMovies: Array<[Movie, MovieSearch]>;
}

export const MovieInitialState: IMovieState = {
    recentlyAddedMovies: null,
};
