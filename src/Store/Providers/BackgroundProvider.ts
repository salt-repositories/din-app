import { ApiClientProvider } from "../../Client";
import { AppContext } from "../../Context/AppContext";
import { BackgroundImage } from "../../Models";
import { MainActions } from "../Main/actions";
import { IInitialState } from "../states";

const apiClient = ApiClientProvider.getClient();

export const BackgroundProvider = async (context: AppContext) => {
    const state: IInitialState = context.store.getState();

    let backgroundImages: BackgroundImage[] = state.main.backgroundImages;

    if (!backgroundImages) {
        backgroundImages = await apiClient.v1.media.getBackgrounds();
        context.store.dispatch(MainActions.setBackgroundImages(backgroundImages));
    }

    return backgroundImages;
};

