import { ComponentsInitialState, IComponentsState } from "./Components/states";
import { IMainState, MainInitialState } from "./Main/states";
import { IMovieState, MovieInitialState } from "./Movie/states";

export interface IInitialState {
    main: Readonly<IMainState>;
    movie: Readonly<IMovieState>;
    components: Readonly<IComponentsState>;
}

export const InitialState: IInitialState = {
    main: MainInitialState,
    movie: MovieInitialState,
    components: ComponentsInitialState,
};
