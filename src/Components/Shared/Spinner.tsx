import { Icon, Spin } from "antd";
import React from "react";

export const Spinner = (): JSX.Element => (
    <Spin
        tip="Loading..."
        indicator={<Icon type="loading" style={{fontSize: "50px"}}/>}
        style={{
            display: "block",
            margin: "10em auto",
        }}
    />
);
