import {HomeActions, IHomePayload} from "./actions";
import {HomeInitialState, IHomeState} from "./states";
import produce from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export default reducerWithInitialState(HomeInitialState).case(
    HomeActions.getBackgroundImages,
    (
        state: Readonly<IHomeState>,
        payload: Readonly<IHomePayload>,
    ): IHomeState => {
        return produce(state, (draft: IHomeState) => {
            draft.backgroundImages = payload.backgroundImages;
        });
    },
);
