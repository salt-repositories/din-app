import { BackgroundImage } from "../../Models";

export interface IMainState {
    backgroundImages: BackgroundImage[];
    carouselIndex: number;
    activeMenuItem: string;
}

export const MainInitialState: IMainState = {
    backgroundImages: null,
    carouselIndex: 0,
    activeMenuItem: null,
};
