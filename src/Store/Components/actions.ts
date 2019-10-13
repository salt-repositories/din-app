import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("Components");

export const ComponentsActions = {
    setShowYoutubeModal: actionCreator<boolean>("SET_SHOW_YOUTUBE_MODAL"),
};
