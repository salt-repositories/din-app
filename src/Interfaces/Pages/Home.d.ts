import {BackgroundImage} from "@Models/Media/BackgroundImage";
import {Props} from "prop-types";

declare namespace IHomePage {
    export type IProps = IOwnProps & IStateProps & IDispatchProps;

    export interface IOwnProps extends Props<{}> {
        backgrounds: BackgroundImage[];
    }

    export interface IState {
    }

    export interface IStateProps {
    }

    export interface IDispatchProps {
        Map(payload: Actions.IMapPayload): Actions.IMapResponse;
        GetBackgroundImages(): Actions.IGetApodResponse;
    }

    namespace Actions {
        export interface IMapPayload {
        }

        export interface IMapResponse {
        }
    }
}
