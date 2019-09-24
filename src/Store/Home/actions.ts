import actionCreatorFactory from "typescript-fsa/dist/typescript-fsa";
import { BackgroundImage } from "../../Models";
import { GET_BACKGROUNDS } from "./constants";

const actionCreator = actionCreatorFactory("Home");

export interface IHomePayload {
    backgroundImages: BackgroundImage[];
}

export const HomeActions = {
    getBackgroundImages: actionCreator(GET_BACKGROUNDS),
};
