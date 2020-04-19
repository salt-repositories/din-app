import { Col, Icon, Progress, Row } from "antd";
import { Actions } from "easy-peasy";
import React, { useEffect } from "react";
import { Queue } from "../../../Domain/Models";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";

interface IQueueRowProps {
    item: Queue;
    percentage: number;
}

const GIGABYTE: number = 1073741824;
const MEGABYTE: number = 1048576;

const QueueRow = (props: IQueueRowProps): JSX.Element => {
    const getSize = (item: Queue): string => {
        return item.size > GIGABYTE
            ? `${(item.size / GIGABYTE).toFixed(1)} GB`
            : `${(item.size / MEGABYTE).toFixed(0)} MB`;
    };

    return (
        <Row
            className="queue-item"
        >
            <Col xs={7} offset={1} className="title">{props.item.content.title}</Col>
            <Col xs={1} offset={1}>
                {
                    props.item.status === "Paused"
                        ? <Icon type="pause-circle"/>
                        : <Icon type="play-circle"/>
                }
            </Col>
            <Col xs={2}>{getSize(props.item)}</Col>
            <Col xs={10} offset={1}>
                <Progress
                    className="progress"
                    strokeColor="#ff8d1c"
                    status={props.item.status !== "Paused" && props.percentage < 100 ? "active" : undefined}
                    percent={props.percentage}
                />
            </Col>
        </Row>
    );
};

export const CurrentQueue = (): JSX.Element => {
    const queue = useStoreState((state: IRootState) => state.queue.currentQueue);
    const getCurrentQueue = useStoreActions((actions: Actions<IRootState>) => actions.queue.getCurrentQueue);

    const getPercentage = (item: Queue): number => {
        return Number((100 - (item.sizeLeft / item.size) * 100).toFixed(2));
    };

    useEffect(() => {
        getCurrentQueue();
    }, []);

    return (
        <div className="current-queue-container">
            <h1>Current Queue</h1>
            <Col span={24} className="vertical-container">
                {queue.length !== 0 && (
                    queue.map((item: Queue) => (
                        <QueueRow key={item.id} item={item} percentage={getPercentage(item)}/>
                    ))
                )}
            </Col>
            <style jsx>
                {`
                    .current-queue-container {
                        visibility: ${queue.length === 0 && "hidden;"}
                        height: 350px;
                    }
                                      
                    .current-queue-container h1 {
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    :global(.vertical-container) {
                        flex-wrap: nowrap;
                        margin: 0 auto;
                        scrollbar-width: none;
                        white-space: nowrap;
                        overflow-y: auto;
                        max-height: 95%;
                    }
                    
                    :global(.queue-item) {
                        border: 1px dashed #ff8d1c;
                        margin-top: 5px;
                        height: 50px;
                    }
                    
                    :global(.queue-item > div) {
                        line-height: 50px;
                        color: #fff;
                    }
                    
                    :global(.queue-item .title) {
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                                       
                    :global(.queue-item .logo) {
                        width: 12px;
                    }
                    
                    :global(.queue-item .progress span) {
                        color: #fff;
                    }
                    
                    :global(.vertical-container .empty) {
                        margin: 0 auto;
                        display: block;
                        text-align: center;
                        margin-top: 20%;
                        color: #fff;
                    }
                `}
            </style>
        </div>
    );
};
