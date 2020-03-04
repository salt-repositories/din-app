import { createStore, createTypedHooks } from "easy-peasy";
import { componentsState, IComponentsState } from "./Modules/Components";
import { IMainState, mainState } from "./Modules/Main";
import { IMovieState, movieState } from "./Modules/Movie";
import { IQueueState, queueState } from "./Modules/Queue";

export interface IRootState {
    main: Readonly<IMainState>;
    movie: Readonly<IMovieState>;
    components: Readonly<IComponentsState>;
    queue: Readonly<IQueueState>;
}

export const storeStructure: IRootState = {
    main: mainState,
    movie: movieState,
    components: componentsState,
    queue: queueState,
};

export const initializeStore = (initialState) => {
    return createStore(storeStructure, initialState);
};

const typedHooks = createTypedHooks<IRootState>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
