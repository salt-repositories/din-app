import { library } from "@fortawesome/fontawesome-svg-core";
import { faPause, faPlay, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deserialize } from "class-transformer";
import React, { useEffect, useState } from "react";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { Queue } from "../../../Models";
import { ContentHub, HubProvider } from "../../../SignalR";
import { Activity } from "react-feather";

library.add(faPause, faPlay, faTachometerAlt);

const contentHub: ContentHub = HubProvider(ContentHub);

interface IQueueRowProps {
    item: Queue;
    percentage: number;
}

const QueueRow = (props: IQueueRowProps): JSX.Element => {
    return (
        <Row
            className="queue-item"
        >
            <Col xs={5}>{props.item.content.title}</Col>
            <Col xs={1}>{
                props.item.status === "Paused"
                    ? <FontAwesomeIcon
                        icon={["fas", "pause"]}
                        size="sm"
                        className="logo"
                    />
                    : <FontAwesomeIcon
                        icon={["fas", "play"]}
                        size="sm"
                        className="logo"
                    />
            }</Col>
            <Col xs={6}>
                <ProgressBar
                    animated={props.item.status !== "Paused"}
                    now={props.percentage}
                    label={`${props.percentage}%
                    eta (${props.item.eta.format("ddd DD-MM-YYYY HH:mm:ss")})`}/>
            </Col>
        </Row>
    );
};

export const CurrentQueue = (): JSX.Element => {
    const stopAutoClean = true;
    const [queue, setQueue] = useState<Queue[]>([]);

    const getPercentage = (item: Queue): number => {
        return Number((100 - (item.sizeLeft / item.size) * 100).toFixed(2));
    };

    useEffect(() => {
        async function connect() {
            await contentHub.getCurrentQueue((response: string) => {
                setQueue(deserialize(Queue, response) as unknown as Queue[]);
            }).catch();
        }

        connect();

        return async function cleanup() {
            await contentHub.disconnect();
        };
    }, [stopAutoClean]);

    return (
        <Card
            className="current-queue"
        >
            <Card.Body>
                <Card.Title>Current Queue</Card.Title>
                <Col className="vertical-container">
                    {queue.length !== 0 ? (
                        queue.map((item: Queue) => {
                            const percentage = getPercentage(item);

                            return (
                                <QueueRow key={item.id} item={item} percentage={percentage}/>
                            );
                        })
                    ) : (
                        <div className="empty">
                            <Activity color="white" size={40}/>
                            <p>Nothing in queue</p>
                        </div>
                    )}
                </Col>
            </Card.Body>
            <style jsx>
                {`
                    :global(.current-queue) {
                        border-radius: 5px;
                        width: 35vw;
                        height: 400px;
                        background: #2b2b2ba8;
                        margin: 5vh auto auto 63vw;
                    }
                    
                    :global(.current-queue > .card-body) {
                        height: 100%;
                    }
                    
                    :global(.current-queue > .card-body > .card-title) {
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                        width: 95%;
                        margin: 0 auto;
                    }
                    
                    :global(.vertical-container) {
                        flex-wrap: nowrap;
                        margin: 0 auto;
                        scrollbar-width: none;
                        white-space: nowrap;
                        overflow-y: auto;
                        max-width: 95%;
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
                    
                    :global(.queue-item .progress) {
                        margin-top: 17px;
                        background-color: #626262;
                    }

                    :global(.queue-item .progress .progress-bar) {
                        background-color: #ff8d1c;
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
