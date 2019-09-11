import {HomeInitialState, IHomeState} from "./Home/states";

export interface IInitialState {
    home: Readonly<IHomeState>;
}

export const InitialState: IInitialState = {
    home: HomeInitialState,
};
