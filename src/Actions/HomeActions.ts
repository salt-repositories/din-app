import ApiClient from "@Client/ApiClient";
import { ActionConsts } from "@Definitions";
import { Dispatch } from "redux";

export const HomeActions = {
    Map: (payload: {}) => ({
        payload,
        type: ActionConsts.Home.SetReducer,
    }),

    Reset: () => ({
        type: ActionConsts.Home.ResetReducer,
    }),

    GetBackgroundImages: () => async (dispatch: Dispatch) => {
        const backgrounds = await new ApiClient().v1.media.getBackgrounds();

        dispatch({
            payload: {
                backgrounds,
            },
            type: ActionConsts.Home.SetReducer,
        });
    },
};
