import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { BackgroundImage } from "../../Domain/Models";
import { HttpClient } from "../../Domain/Utils";

export * from "./providers";

export interface IBackgroundState {
    items: BackgroundImage[];
    getBackgroundImages: Thunk<IBackgroundState>;
    setBackgroundImages: Action<IBackgroundState, BackgroundImage[]>;
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
    windowWidth: number;
    setWindowWidth: Action<IMainState, number>;
}

export const mainState: IMainState = {
    backgroundImages: {
        items: [],
        getBackgroundImages: thunk(async (actions: Actions<IBackgroundState>) => {
            const response = await HttpClient.get("/v1/media/backgrounds", {
                type: BackgroundImage
            }) as unknown as BackgroundImage[];

            actions.setBackgroundImages(response);
        }),
        setBackgroundImages: action((state: IBackgroundState, payload: BackgroundImage[]) => {
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
    windowWidth: undefined,
    setWindowWidth: action((state: IMainState, payload: number) => {
        state.windowWidth = payload
    }),
};
