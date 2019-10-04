import { IInitialState } from "../states";

export const carouselIndexSelector = (state: IInitialState) =>
    state.main.carouselIndex;
export const backgroundImagesSelector = (state: IInitialState) =>
    state.main.backgroundImages;

