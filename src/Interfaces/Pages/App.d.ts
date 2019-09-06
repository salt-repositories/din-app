import {IStore} from "@Interfaces/Redux/Store";
import {Props} from "prop-types";

declare namespace IApp {
    export interface IProps extends Props<{}> {
        reduxStore: IStore;
    }

    export interface IState {
    }
}
