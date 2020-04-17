import { BackgroundImage } from "../../Domain/Models/Media";
import { AppContext } from "../AppContext";

export const getBackgrounds = async (context: AppContext) => {
    let backgrounds: BackgroundImage[] = context.store.getState().main.backgroundImages.items;

    if (backgrounds.length <= 0) {
        await context.store.dispatch.main.backgroundImages.getBackgroundImages();
        backgrounds = context.store.getState().main.backgroundImages.items;
    }

    return backgrounds;
};
