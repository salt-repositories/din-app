import { Input, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface IProps {
    getMethod: any;
    setParamsPropMethod: (value: [string, any]) => void;
    setFiltersPropMethod: (value: [string, any]) => void;
    totalCount: number;
}

export const HeaderFilters: React.FC<IProps> = (props: IProps) => {


    const [query, setQuery] = useState<string>("");
    const [debouncedQuery] = useDebounce(query, 800);

    const resetSkipAndTake = () => {
        props.setParamsPropMethod(["skip", 0]);
        props.setParamsPropMethod(["take", 50]);
    };

    useEffect(() => {
        props.setFiltersPropMethod(["title", debouncedQuery]);
        resetSkipAndTake();
        props.getMethod();
    }, [debouncedQuery]);

    const paramsOnChange = (prop: string, value: string) => {
        resetSkipAndTake();
        props.setParamsPropMethod([prop, value]);
        props.getMethod();
    };

    return (
        <>
            <div className="header-filters">
                <Tag color="orange">{props.totalCount}</Tag>
                <Select defaultValue="title" onChange={(value: string) => paramsOnChange("sortBy", value)}>
                    <Select.Option value="title">Title</Select.Option>
                    <Select.Option value="year">Year</Select.Option>
                    <Select.Option value="added">Date added</Select.Option>
                </Select>
                <Select defaultValue="Asc" onChange={(value: string) => paramsOnChange("sortDirection", value)}>
                    <Select.Option value="Asc">Ascending</Select.Option>
                    <Select.Option value="Desc">Descending</Select.Option>
                </Select>
                <Input.Search
                    className="search-input"
                    placeholder="Search by title"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
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
                    
                    .header-filters > :global(span) {
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
                    
                    .header-filters :global(.search-input) {
                        width: 20em;
                    }
                    
                    .header-filters :global(.search-input input) {
                        background: #575757;
                        color: #fff;
                    }
                    
                    .header-filters :global(.search-input i) {
                        color: #fff;
                    }
                `}
            </style>
        </>
    );
};
