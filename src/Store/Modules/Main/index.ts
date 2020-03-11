import { action, Action, thunk, Thunk } from "easy-peasy";
import { ApiClientProvider } from "../../../Domain/Client";
import { BackgroundImage } from "../../../Domain/Models";

export * from "./providers";

export interface IBackgroundState {
    items: BackgroundImage[];
    getBackgroundImages: Thunk<IBackgroundState>;
    addBackgroundImages: Action<IBackgroundState, BackgroundImage[]>;
}

export interface ICarouselState {
    carouselIndex: number;
    setCarouselIndex: Action<ICarouselState, number>;
}

export interface IMenuState {
    activeMenuKey: string;
    setActiveMenuKey: Action<IMenuState, string>;
}

export interface IMainState {
    backgroundImages: IBackgroundState;
    carousel: ICarouselState;
    menu: IMenuState;
}

export const mainState: IMainState = {
    backgroundImages: {
        items: [],
        getBackgroundImages: thunk(async (actions) => {
            const apiClient = ApiClientProvider.getClient();
            const backgrounds = await apiClient.v1.media.getBackgrounds();
            actions.addBackgroundImages(backgrounds);
        }),
        addBackgroundImages: action((state: IBackgroundState, payload: BackgroundImage[]) => {
            state.items.push(...payload);
        }),
    },
    carousel: {
        carouselIndex: 0,
        setCarouselIndex: action((state: ICarouselState, payload: number) => {
            state.carouselIndex = payload;
        }),
    },
    menu: {
        activeMenuKey: "Home",
        setActiveMenuKey: action((state: IMenuState, payload: string) => {
            state.activeMenuKey = payload;
        }),
    },
};
