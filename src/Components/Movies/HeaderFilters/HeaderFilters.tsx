import { Select, Tag } from "antd";
import { Actions } from "easy-peasy";
import React from "react";
import { IRootState, useStoreActions } from "../../../Store";

interface IProps {
    totalCount: number;
}

export const HeaderFilters: React.FC<IProps> = (props: IProps) => {
    const getMovies = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.get);
    const setParamProp = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.setParamProp);

    const paramsOnChange = (prop: string, value: string) => {
        setParamProp(["skip", 0]);
        setParamProp(["take", 50]);
        setParamProp([prop, value]);
        getMovies();
    };

    return (
        <>
            <div className="header-filters">
                <Select defaultValue="title" onChange={(value: string) => paramsOnChange("sortBy", value)}>
                    <Select.Option value="title">Title</Select.Option>
                    <Select.Option value="year">Year</Select.Option>
                    <Select.Option value="added">Date added</Select.Option>
                </Select>
                <Select defaultValue="Asc" onChange={(value: string) => paramsOnChange("sortDirection", value)}>
                    <Select.Option value="Asc">Ascending</Select.Option>
                    <Select.Option value="Desc">Descending</Select.Option>
                </Select>
                <Tag color="orange">{props.totalCount}</Tag>
            </div>
            <style jsx>
                {`
                    .header-filters {
                        z-index: 2;
                        position: fixed;
                        width: 100%;
                        margin: -5px 0 0 -20px;
                        height: 4em;
                        background-color: #2b2b2ba8;
                        box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);
                    }
                    
                    .header-filters > :global(div) {
                        margin: 10px;
                    }
                    
                    .header-filters :global(.ant-select-selection) {
                        color: #fff;
                        border: unset;
                        background: unset;
                    }
                    
                    .header-filters :global(.ant-select-selection > div) {
                        margin-right: 30px
                    }
                    
                    .header-filters :global(.ant-select-selection i) {
                        margin-left: 5px;
                        color: #fff;
                    }
                `}
            </style>
        </>
    );
};
