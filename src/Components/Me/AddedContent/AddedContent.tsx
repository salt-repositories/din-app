import { Table } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import { SorterResult } from "antd/es/table";
import { Actions } from "easy-peasy";
import React, { useEffect } from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { Spinner } from "../../Shared/Spinner";
import { columns } from "./Columns";
import { IAddedContentRow } from "./IAddedContentRow";

export const AddedContent: React.FC = (): JSX.Element => {
    const addedContent = useStoreState((state: IRootState) => state.me.addedContent);
    const params = useStoreState((state: IRootState) => state.me.queryParameters);
    const loading = useStoreState((state: IRootState) => state.me.getAddedContentLoading);

    const getAddedContent = useStoreActions((actions: Actions<IRootState>) => actions.me.getAddedContent);
    const setParam = useStoreActions((actions: Actions<IRootState>) => actions.me.setParamProp);
    const setFilters = useStoreActions((actions: Actions<IRootState>) => actions.me.setFilters);

    useEffect(() => {
        if (addedContent.items.length <= 0) {
            getAddedContent(undefined);
        }
    }, []);

    const toSortKey = (value: string) => {
        if (!value) {
            return "";
        } else if (value.includes("asc")) {
            return "Asc";
        } else if (value.includes("desc")) {
            return "Desc";
        }
    };

    const handleTableChange = (pagination: PaginationConfig, filters: Partial<Record<keyof IAddedContentRow, string[]>>, sorters: SorterResult<IAddedContentRow>) => {
        if (filters) {
            setFilters(filters);
        }

        if (sorters) {
            setParam(["sortBy", sorters.columnKey]);
            setParam(["sortDirection", toSortKey(sorters.order)]);
        }

        setParam(["skip", pagination.current * params.take - params.take]);
        getAddedContent(undefined);
    };

    const data: IAddedContentRow[] = addedContent.items.map((item) => ({
        key: item.id,
        id: item.id,
        systemId: item.systemId,
        foreignId: item.foreignId,
        title: item.title,
        type: item.type,
        dateAdded: item.dateAdded,
        status: item.status,
    }));


    return (
        <>
            <div className="parent">
                <Table<IAddedContentRow>
                    className="added-content-table"
                    title={() => "Added Content"}
                    dataSource={data}
                    columns={columns}
                    pagination={{
                        total: addedContent.totalCount,
                        defaultPageSize: 10,
                    }}
                    loading={{
                        spinning: loading,
                        indicator: <Spinner hideText={true}/>
                    }}
                    onChange={handleTableChange}
                />
            </div>

            <style jsx>
                {`
                    .parent {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                    }
                    
                    :global(.added-content-table) {
                        width: 80%;
                    }
                    
                    :global(.added-content-table .ant-table-title) {
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    :global(.added-content-table .ant-table-thead tr th) {
                        border: none;
                    }
                    
                    :global(.added-content-table .ant-table-placeholder) {
                        background: transparent;
                        border: none;
                    }
                    
                    :global(.added-content-table .ant-table-placeholder .ant-empty p) {
                        color: #fff;
                    }
                    
                    :global(.added-content-table .ant-table-row td) {
                        color: #fff;
                        border-color: #8c8c8c;
                    }
                    
                    :global(.added-content-table .ant-pagination li) {
                        background: #00000024;
                        border-color: #0000005e;
                        color: #ff8d1c99;
                    }
                    
                    :global(.added-content-table .ant-pagination .ant-pagination-item-active > a) {
                        color: #ff8d1c;
                    }
                    
                    :global(.added-content-table .ant-pagination li > a) {
                        background: #00000024;
                        border-color: #0000005e;
                        color: #ff8d1c99;
                    }
                `}
            </style>
        </>
    );
};
