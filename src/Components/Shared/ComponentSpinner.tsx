import React from "react";
import { Spinner } from "react-bootstrap";

interface IProps {
    loading: boolean;
}

export const ComponentSpinner = (props: IProps): JSX.Element => {
    return (
        props.loading && (
            <React.Fragment>
                <Spinner
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    className="component-spinner"
                />
                <style jsx>
                    {`
                        :global(.component-spinner) {
                            display: flex;
                            margin: auto auto;
                            color: #ff8d1c;
                        }
                    `}
                </style>
            </React.Fragment>
        )
    );
};

