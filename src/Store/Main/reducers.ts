import produce from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ISetBackgroundsPayload, ISetCarouselIndexPayload, MainActions } from "./actions";
import { IMainState, MainInitialState } from "./states";

export default reducerWithInitialState(MainInitialState)
    .case(
        MainActions.setBackgroundImages,
        (
            state: Readonly<IMainState>,
            payload: ISetBackgroundsPayload,
        ): IMainState => {
            const { backgroundImages } = payload;
            return produce(state, (draft: IMainState) => {
                draft.backgroundImages = backgroundImages;
            });
        },
    )
    .case(
        MainActions.setCarouselIndex,
        (
            state: Readonly<IMainState>,
            payload: ISetCarouselIndexPayload,
        ): IMainState => {
            const { index } = payload;
            return produce(state, (draft: IMainState) => {
                draft.carouselIndex = index;
            });
        },
    )
    .case(
        MainActions.setActiveMenuItem,
        (
            state: Readonly<IMainState>,
            payload: string,
        ): IMainState => {
            return produce(state, (draft: IMainState) => {
                draft.activeMenuItem = payload;
            });
        },
    );
