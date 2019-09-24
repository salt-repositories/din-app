import { BackgroundImage } from "../../Models";

export interface IHomeState {
    backgroundImages: BackgroundImage[];
}

export const HomeInitialState: IHomeState = {
    backgroundImages: null,
};
