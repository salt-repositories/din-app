import actionCreatorFactory from "typescript-fsa";
import { BackgroundImage } from "../../Models";

const actionCreator = actionCreatorFactory("Main");

export const MainActions = {
    setBackgroundImages: actionCreator<BackgroundImage[]>("SET_BACKGROUNDS"),
    setCarouselIndex: actionCreator<number>("SET_CAROUSEL_INDEX"),
    setActiveMenuItem: actionCreator<string>("SET_ACTIVE_MENU_ITEM"),
};
