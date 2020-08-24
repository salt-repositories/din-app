import { LoadingOutlined } from "@ant-design/icons/lib";
import { Spin } from "antd";
import React from "react";

interface IProps {
    marginTop?: number;
    marginBottom?: number;
    hideText?: boolean;
}

export const Spinner = (props: IProps): JSX.Element => (
    <Spin
        tip={!props.hideText ? "Loading..." : ""}
        indicator={<LoadingOutlined style={{fontSize: "50px"}}/>}
        style={{
            display: "block",
            margin: `${props.marginTop ?? 10}em auto ${props.marginBottom ?? 0}em auto`,
        }}
    />
);
