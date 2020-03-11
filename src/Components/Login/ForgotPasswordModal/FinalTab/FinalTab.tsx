import React from "react";
import { Tab } from "../Tab";

interface IProps {
    handleClose(): void;
}

export const FinalTab = (props: IProps): JSX.Element => {
    return (
        <Tab
            final={true}
            submitText={"Close"}
            closeCallback={props.handleClose}
        >
            <p>
                Your password has been changed successfully.
            </p>
        </Tab>
    );
};
