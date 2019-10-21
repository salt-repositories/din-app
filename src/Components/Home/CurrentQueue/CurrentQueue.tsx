import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deserialize } from "class-transformer";
import React, { useEffect, useState } from "react";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { MovieQueue } from "../../../Models/Movies";
import { HubProvider, MovieHub } from "../../../SignalR";

library.add(faPause, faPlay, faCheck);

const movieHub: MovieHub = HubProvider(MovieHub);

// TODO: get tvshow queue and combine collections
export const CurrentQueue = (): JSX.Element => {
    const loaded = true;
    const [movieQueue, setMovieQueue] = useState<MovieQueue[]>([]);

    const getPercentage = (item: MovieQueue): number => {
        return Number((100 - (item.sizeLeft / item.size) * 100).toFixed(2));
    };

    useEffect(() => {
        movieHub.getMovieQueue((response) => {
            setMovieQueue(deserialize(MovieQueue, response) as unknown as MovieQueue[]);
        }).catch((error) => console.log(error));

        return async function cleanup() {
            await movieHub.disconnect();
        };
    }, [loaded]);

    return (
        <Card
            className="current-queue"
        >
            <Card.Body>
                <Card.Title>Current Queue</Card.Title>
                <Col className="vertical-container">
                    {movieQueue.length !== 0
                        ? movieQueue.map((item: MovieQueue) => {
                            const percentage = getPercentage(item);

                            return (
                                <Row
                                    key={item.id}
                                    className="queue-item"
                                >
                                    <Col xs={5}>{item.movie.title}</Col>
                                    <Col xs={1}>{
                                        item.status === "Paused"
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
                                            animated={item.status !== "Paused"}
                                            now={percentage}
                                            label={`${percentage}%
                                            eta (${item.eta.format("ddd DD-MM-YYYY HH:mm:ss")})`}/>
                                    </Col>
                                </Row>
                            );
                        })
                        : (
                            <div className="empty">
                                <FontAwesomeIcon
                                    icon={["fas", "check"]}
                                    size="sm"
                                    className="logo"
                                />
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
                    
                    :global(.vertical-container .empty .logo) {
                        width: 50px;
                    }
                `}
            </style>
        </Card>
    );
};
