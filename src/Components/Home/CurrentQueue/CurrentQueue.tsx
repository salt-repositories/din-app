import { Card, Col, Icon, Progress, Row } from "antd";
import { Actions } from "easy-peasy";
import React, { useEffect } from "react";
import { Queue } from "../../../Domain/Models";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";

interface IQueueRowProps {
    item: Queue;
    percentage: number;
}

const GIGABYTE: number = 1073741824;

const QueueRow = (props: IQueueRowProps): JSX.Element => {
    const getSizeInGb = (item: Queue): string => {
        return `${Math.round(item.size / GIGABYTE).toFixed(1)} GB`;
    };

    return (
        <Row
            className="queue-item"
        >
            <Col xs={7} offset={1}>{props.item.content.title}</Col>
            <Col xs={1} offset={1}>
                {
                    props.item.status === "Paused"
                        ? <Icon type="pause-circle"/>
                        : <Icon type="play-circle"/>
                }
            </Col>
            <Col xs={2}>{getSizeInGb(props.item)}</Col>
            <Col xs={10} offset={1}>
                <Progress
                    className="progress"
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
        <Card className="current-queue">
            <h1>Current Queue</h1>
            <Col span={24} className="vertical-container">
                {queue.length !== 0 ? (
                    queue.map((item: Queue) => {
                        const percentage = getPercentage(item);

                        return (
                            <QueueRow key={item.id} item={item} percentage={percentage}/>
                        );
                    })
                ) : (
                    <div className="empty">
                        <Icon type="exclamation-circle" />
                        <p>Nothing in queue</p>
                    </div>
                )}
            </Col>
            <style jsx>
                {`
                    :global(.current-queue) {
                        position: fixed;
                        top: 2em;
                        right: 2em;
                        border-radius: 5px;
                        width: 35vw;
                        height: 400px;
                        background: #2b2b2ba8;
                        margin: auto;
                        border: none;
                    }
                    
                    :global(.current-queue > .ant-card-body) {
                        height: 85%;
                    }
                    
                    :global(.current-queue h1) {
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                        margin: 0 auto;
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
        </Card>
    );
};
