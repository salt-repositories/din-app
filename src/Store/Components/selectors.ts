import { IComponentsState } from "./states";

export const showYoutubeModalSelector = (state: IComponentsState) =>
    state.recentlyAdded.showYoutubeModal;

export const showForgotPasswordModalSelector = (state: IComponentsState) =>
    state.forgotPassword.visible;

export const forgotPasswordModalTabIndex = (state: IComponentsState) =>
    state.forgotPassword.currentTab;
