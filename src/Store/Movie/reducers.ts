import produce from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Movie, MovieSearch } from "../../Models/Movies";
import { MovieActions } from "./actions";
import { IMovieState, MovieInitialState } from "./states";

export default reducerWithInitialState(MovieInitialState)
    .case(
        MovieActions.setRecentlyAddedMovies,
        (
            state: Readonly<IMovieState>,
            payload: Array<[Movie, MovieSearch]>,
        ): IMovieState => {
            return produce(state, (draft: IMovieState) => {
                draft.recentlyAddedMovies = payload;
            });
        },
    );
