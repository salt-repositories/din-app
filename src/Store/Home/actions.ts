import actionCreatorFactory from "typescript-fsa/dist/typescript-fsa";
import {BackgroundImage} from "../../Models";

const actionCreator = actionCreatorFactory("Home");

export interface IHomePayload {
    backgroundImages: BackgroundImage[];
}

export const HomeActions = {
    getBackgroundImages: actionCreator<IHomePayload>("getBackgroundImages"),
};
