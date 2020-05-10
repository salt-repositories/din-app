import { Icon, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/es/table";
import { Moment } from "moment";
import React from "react";
import { IAddedContentRow } from "./IAddedContentRow";

export const columns: ColumnProps<IAddedContentRow>[] = [
    {
        title: "Type",
        dataIndex: "type",
        width: "7em",
        filters: [
            {text: "Movies", value: "Movie"},
            {text: "Tv Shows", value: "TvShow"},
        ],
        filterMultiple: false,
        onFilter: ((value, record) => record.type.includes(value)),
        render: (value: string) => (
            <>
                {value === "Movie" &&
                <Tooltip title="Movie">
                    <Icon type="video-camera" style={{color: "#ff8d1c"}}/>
                </Tooltip>
                }
                {value === "TvShow" &&
                <Tooltip title="Tv Show">
                    <Icon type="desktop" style={{color: "#ff8d1c"}}/>
                </Tooltip>
                }
            </>
        )
    },
    {
        title: "Title",
        dataIndex: "title",
        sorter: ((a, b) => a.title.localeCompare(b.title)),
    },
    {
        title: "Date added",
        dataIndex: "dateAdded",
        sorter: ((a, b) => a.dateAdded.unix() - b.dateAdded.unix()),
        defaultSortOrder: "ascend",
        render: (value: Moment) => (
            <span>{value.calendar()}</span>
        )
    },
    {
        title: "Status",
        dataIndex: "status",
        filters: [
            {text: "Not Available", value: "NotAvailable"},
            {text: "Queued", value: "Queued"},
            {text: "Downloading", value: "Downloading"},
            {text: "Stuck", value: "Stuck"},
            {text: "Done", value: "Done"}
        ],
        filterMultiple: false,
        onFilter: ((value, record) => record.status.includes(value)),
        render: (value: string) => (
            <>
                {value === "NotAvailable" && <Tag color="blue">Not Available</Tag>}
                {value === "Queued" && <Tag color="orange">Queued</Tag>}
                {value === "Downloading" && <Tag color="gold">Downloading</Tag>}
                {value === "Stuck" && <Tag color="red">Stuck</Tag>}
                {value === "Done" && <Tag color="green">Done</Tag>}
            </>
        )
    }
];
