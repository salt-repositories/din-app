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
                draft.recentlyAdded.showYoutubeModal = payload;
            });
        },
    )
    .case(
        ComponentsActions.setShowForgotPasswordModal,
        (
            state: Readonly<IComponentsState>,
            payload: boolean,
        ): IComponentsState => {
            return produce(state, (draft: IComponentsState) => {
                draft.forgotPassword.visible = payload;
            });
        },
    )
    .case(
        ComponentsActions.setForgotPasswordModalTabIndex,
        (
            state: Readonly<IComponentsState>,
            payload: number,
        ): IComponentsState => {
            return produce(state, (draft: IComponentsState) => {
                draft.forgotPassword.currentTab = payload;
            });
        },
    )
    .case(
        ComponentsActions.ForgotPassword.setLoading,
        (
            state: Readonly<IComponentsState>,
            payload: boolean,
        ): IComponentsState => {
            return produce(state, (draft: IComponentsState) => {
                draft.forgotPassword.loading = payload;
            });
        },
    );
