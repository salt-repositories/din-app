import produce from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import ApiClient from "../../Client/ApiClient";
import { BackgroundImage } from "../../Models";
import { HomeActions } from "./actions";
import { HomeInitialState, IHomeState } from "./states";

const apiClient = new ApiClient();

export default reducerWithInitialState(HomeInitialState)
    .case(
        HomeActions.getBackgroundImages,
        (state: Readonly<IHomeState>): IHomeState => {
            apiClient.v1.media.getBackgrounds().then((response: BackgroundImage[]) => {
                return produce(state, (draft: IHomeState) => {
                    draft.backgroundImages = response;
                });
            }).catch((error) => ({error}));
            return null;
        },
    );
