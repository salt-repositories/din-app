import produce from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ComponentsActions } from "./actions";
import { ComponentsInitialState, IComponentsState } from "./states";

export default reducerWithInitialState(ComponentsInitialState)
    .case(
        ComponentsActions.setShowYoutubeModal,
        (
            state: Readonly<IComponentsState>,
            payload: boolean,
        ): IComponentsState => {
            return produce(state, (draft: IComponentsState) => {
                draft.showYoutubeModal = payload;
            });
        },
    );
