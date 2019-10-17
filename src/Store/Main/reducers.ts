import produce from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { BackgroundImage } from "../../Models/Media";
import { MainActions } from "./actions";
import { IMainState, MainInitialState } from "./states";

export default reducerWithInitialState(MainInitialState)
    .case(
        MainActions.setBackgroundImages,
        (
            state: Readonly<IMainState>,
            payload: BackgroundImage[],
        ): IMainState => {
            return produce(state, (draft: IMainState) => {
                draft.backgroundImages = payload;
            });
        },
    )
    .case(
        MainActions.setCarouselIndex,
        (
            state: Readonly<IMainState>,
            payload: number,
        ): IMainState => {
            return produce(state, (draft: IMainState) => {
                draft.carouselIndex = payload;
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
