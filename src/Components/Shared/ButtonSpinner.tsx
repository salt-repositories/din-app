import React from "react";
import { Spinner } from "react-bootstrap";

interface IProps {
    loading: boolean;
}

export const ButtonSpinner = (props: IProps): JSX.Element => {
    return (
        props.loading && (
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{
                    marginBottom: "2px",
                    marginRight: "1em",
                }}
            />
        )
    );
};
