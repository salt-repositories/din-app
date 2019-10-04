import { BackgroundImage } from "../../Models";

export interface IMainState {
    backgroundImages: BackgroundImage[];
    carouselIndex: number;
}

export const MainInitialState: IMainState = {
    backgroundImages: null,
    carouselIndex: 0,
};
