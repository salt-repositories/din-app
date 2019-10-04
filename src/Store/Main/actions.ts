import actionCreatorFactory from "typescript-fsa";
import { BackgroundImage } from "../../Models";

const actionCreator = actionCreatorFactory("Main");

export interface ISetBackgroundsPayload {
    backgroundImages: BackgroundImage[];
}

export interface ISetCarouselIndexPayload {
    index: number;
}

export const MainActions = {
    setBackgroundImages: actionCreator<ISetBackgroundsPayload>("SET_BACKGROUNDS"),
    setCarouselIndex: actionCreator<ISetCarouselIndexPayload>("SET_CAROUSEL_INDEX"),
};
