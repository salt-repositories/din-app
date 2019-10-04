import { IMainState, MainInitialState } from "./Main/states";

export interface IInitialState {
    main: Readonly<IMainState>;
}

export const InitialState: IInitialState = {
    main: MainInitialState,
};
