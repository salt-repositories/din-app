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
                    onChange={(value) => setSelect(value)}
                >
                    {props.selectOptions.map((option: [string, ReactNode]) => (
                        <Select.Option key={option[0]} value={option[0]}>{option[0]}</Select.Option>
                    ))}
                </Select>
            </Row>
            <div className="horizontal-container">
                <Row className="row">
                    {props.selectOptions.map((option) => (
                        <div key={option[0]}>
                            {select === option[0] && option[1]}
                        </div>
                    ))}
                </Row>
            </div>
            <style jsx>
                {`
                    :global(.horizontal-content-container) {
                        height: 100%;
                        width: 100%;
                    }
                  
                    :global(.horizontal-content-container .card-title) {
                        margin-left: 10px;
                        float: left;
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    :global(.horizontal-content-container .select) {
                        margin-top: 10px
                    }
                    
                    :global(.horizontal-content-container .select .ant-select-selector) {
                        height: 2em;
                        background: unset;
                        border: unset;
                    }
                    
                    :global(.horizontal-content-container .ant-select:not(.ant-select-borderless).ant-select-focused .ant-select-selector) {
                        border: unset;
                        box-shadow: unset;
                    }
                    
                    :global(.horizontal-content-container .select .ant-select-arrow) {
                        display: none;
                    }
                    
                    :global(.horizontal-content-container .select .ant-select-selection-item) {
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                        line-height: 20px;
                        font-size: 25px;
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
