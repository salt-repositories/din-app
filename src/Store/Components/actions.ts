import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("Components");

export const ComponentsActions = {
    ForgotPassword: {
        setLoading: actionCreator<boolean>("FORGOTPASSWORD_SET_LOADING"),
    },
    setShowYoutubeModal: actionCreator<boolean>("SET_SHOW_YOUTUBE_MODAL"),
    setShowForgotPasswordModal: actionCreator<boolean>("SET_SHOW_FORGOT_PASSWORD_MODAL"),
    setForgotPasswordModalTabIndex: actionCreator<number>("SET_FORGOT_PASSWORD_MODAL_TAB_INDEX"),
};
