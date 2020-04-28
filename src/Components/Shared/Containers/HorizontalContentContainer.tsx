import { Row, Select } from "antd";
import React, { ReactNode, useState } from "react";

interface IProps {
    title: string;
    selectOptions: [string, ReactNode][];
    defaultSelectOption: string;
}

export const HorizontalContentContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [select, setSelect] = useState<string>(props.defaultSelectOption);

    return (
        <div
            className="horizontal-content-container"
        >
            <Row>
                <h1 className="card-title">{props.title}</h1>
                <Select
                    defaultValue={select}
                    className="select"
                    onChange={setSelect}
                >
                    {props.selectOptions.map((option: [string, ReactNode]) => (
                        <Select.Option value={option[0]}>{option[0]}</Select.Option>
                    ))}
                </Select>
            </Row>
            <div className="horizontal-container">
                <Row className="row">
                    {props.selectOptions.map((option) => (
                        <>
                            {select === option[0] && option[1]}
                        </>
                    ))}
                </Row>
            </div>
            <style jsx>
                {`
                    :global(.horizontal-content-container) {
                        height: 100%;
                    }
                  
                    :global(.horizontal-content-container .card-title) {
                        margin-left: 10px;
                        float: left;
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    :global(.horizontal-content-container .select) {
                        float: left;
                        margin-top: 0.15em;
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    :global(.horizontal-content-container .select .ant-select-selection:focus, .ant-select-selection:active) {
                        box-shadow: none;
                    }
                    
                    :global(.horizontal-content-container .select .ant-select-selection) {
                        background: transparent;
                        border: transparent;
                    }
                     
                    :global(.horizontal-content-container .select .ant-select-arrow) {
                       color: #ff8d1c;
                       right: 5px;
                    }
                    
                    :global(.horizontal-container) {
                        margin: 0 auto;
                        width: 100%;
                        height: 100%;
                        overflow-x: scroll;
                        overflow-y: hidden;
                        white-space: nowrap;
                        scrollbar-width: none;z
                    }
                    
                    :global(.horizontal-container > .row) {
                        flex-wrap: nowrap;
                        height: 100%;
                        margin-left: 0;
                        margin-right: 0;
                    }
                    
                    .horizontal-container::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};
