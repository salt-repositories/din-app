import { Icon, Spin } from "antd";
import React from "react";

interface IProps {
    marginTop?: number;
    marginBottom?: number;
}

export const Spinner = (props: IProps): JSX.Element => (
    <Spin
        tip="Loading..."
        indicator={<Icon type="loading" style={{fontSize: "50px"}}/>}
        style={{
            display: "block",
            margin: `${props.marginTop ?? 10}em auto ${props.marginBottom ?? 0}em auto`,
        }}
    />
);
