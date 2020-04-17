import { createStore, createTypedHooks } from "easy-peasy";
import { authenticationState, IAuthenticationState } from "./Authentication";
import { componentsState, IComponentsState } from "./Components";
import { IMainState, mainState } from "./Main";
import { IMovieState, movieState } from "./Movie";
import { IQueueState, queueState } from "./Queue";
import { ITvShowState, tvShowState } from "./TvShow";

export interface IRootState {
    authentication: Readonly<IAuthenticationState>;
    main: Readonly<IMainState>;
    movie: Readonly<IMovieState>;
    tvShow: Readonly<ITvShowState>;
    components: Readonly<IComponentsState>;
    queue: Readonly<IQueueState>;
}

export const storeStructure: IRootState = {
    authentication: authenticationState,
    main: mainState,
    movie: movieState,
    tvShow: tvShowState,
    components: componentsState,
    queue: queueState,
};

export const initializeStore = (initialState) => {
    return createStore(storeStructure, { initialState });
};

const typedHooks = createTypedHooks<IRootState>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
