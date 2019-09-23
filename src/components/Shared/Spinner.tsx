import React from "react";

const Spinner = (props) => {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
};

export default Spinner;
