import React from "react";
import { Spinner } from "react-bootstrap";

interface IProps {
    loading: boolean;
}

export const ComponentSpinner = (props: IProps): JSX.Element => {
    return (
        props.loading && (
            <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
        )
    );
};

