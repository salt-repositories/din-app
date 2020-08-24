import { CloudDownloadOutlined, VideoCameraOutlined } from "@ant-design/icons/lib";
import { Modal, Timeline } from "antd";
import { Actions } from "easy-peasy";
import moment from "moment";
import React, { useEffect } from "react";
import { Movie } from "../../../Domain/Models/Movies";
import { MovieHistory } from "../../../Domain/Models/Movies/MovieHistory";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { Spinner } from "../Spinner";

interface IProps {
    visible: [boolean, number];
    setVisible: (value: [boolean, number]) => void
}

export const HistoryModal = (props: IProps): JSX.Element => {
    const history = useStoreState((state: IRootState) => state.movie.history);
    const getHistory = useStoreActions((actions: Actions<IRootState>) => actions.movie.getHistory);
    const getHistoryLoading = useStoreState((state: IRootState) => state.movie.getHistoryLoading);

    const singleMovie: Movie = useStoreState((state: IRootState) => state.movie.movies.item);
    const singleMovieLoading = useStoreState((state: IRootState) => state.movie.movies.getByIdLoading);
    const getMovieById = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.getById);

    useEffect(() => {
        if (props.visible[0]) {
            getHistory(props.visible[1]);
        }
    }, [props.visible]);

    useEffect(() => {
        if (history.length === 0 && props.visible[0]) {
            getMovieById(props.visible[1]);
        }
    }, [history]);

    const pending = (): string | undefined => {
        if (history.length > 0 && history[history.length - 1].eventType === "grabbed") {
            return "Downloading or in queue";
        }
    };

    const parseEvent = (item: MovieHistory): string => {
        switch (item.eventType) {
            case "grabbed":
                return "Found a download and added to the queue";
        }
    };

    return (
        <>
            <Modal
                visible={props.visible[0]}
                onCancel={() => props.setVisible([false, undefined])}
                className="history-modal"
                footer={<></>}
                centered
                destroyOnClose={true}
            >
                {getHistoryLoading ? (
                    <Spinner/>
                ) : (
                    <Timeline pending={pending()} pendingDot={<CloudDownloadOutlined/>}>
                        {history.length > 0 ? (
                            history.map((item) => (
                                <Timeline.Item key={item.id}>
                                    <p>{`${parseEvent(item)} - ${item.date.calendar(null, {sameElse: "DD/MM/YYYY"})}`}</p>
                                    {item.eventType === "grabbed" && (
                                        <p
                                            style={{
                                                color: "#ff8d1c99",
                                                position: "inherit",
                                                left: "15px",
                                            }}
                                        >
                                            <VideoCameraOutlined style={{marginRight: "10px"}}/>
                                            {item.sourceTitle}
                                        </p>
                                    )}
                                </Timeline.Item>
                            ))
                        ) : (
                            singleMovieLoading ? (
                                <Spinner/>
                            ) : singleMovie && (
                                <>
                                    <p style={{color: "#ff8d1c99"}}>(This movie has no history)</p>
                                    {singleMovie.inCinemas.isAfter(moment.now()) ? (
                                        <>
                                            <p>{`
                                            This movie still has to play in the cinema's, therefor it's unlikely a download can been found.
                                            It can be seen in the cinema's on ${singleMovie.inCinemas.format("DD MMMM YYYY")}.
                                        `}</p>
                                            {singleMovie.physicalRelease.year() === Number("0001") && (
                                                <p>(It's likely this movie was never released)</p>
                                            )}
                                        </>
                                    ) : singleMovie.physicalRelease.isAfter(moment.now()) ? (
                                        <p>This movie has not yet been released on a physical medium or streaming platform,
                                            this means it's unlikely a download can be found.</p>
                                    ) : (
                                        <p>
                                            This movie has been played in cinema's but no download has been found. This
                                            could mean one of the following things:
                                            <ul>
                                                <li>A download of sufficient quality can not be found.</li>
                                                <li>It's unpopular.</li>
                                                <li>It still needs to be released a physical medium or streaming platform.</li>
                                                <li>It has never been released to a physical medium or streaming platform.</li>
                                            </ul>
                                            If you're really eager to watch this movie contact <span style={{ color: "#c62020" }}>dee roeje</span>.
                                        </p>
                                    )}
                                </>
                            )
                        )}
                    </Timeline>
                )}
            </Modal>
            <style jsx>
                {`
                    :global(.history-modal) {
                        width: 45em !important;
                        color: #fff;
                    }
                    
                    :global(.history-modal .ant-divider) {
                        background: #858585;
                    }
                    
                    :global(.history-modal .ant-modal-content) {
                        background: #414141f0;
                        padding: 20px;
                        border: none;
                    }
                    
                    :global(.history-modal .ant-modal-content p) {
                        color: #fff;
                    }
                    
                    :global(.history-modal .ant-modal-content .ant-timeline-item-content) {
                        color: #fff;
                    }
                    
                    :global(.history-modal .ant-modal-footer) {
                        border: none;
                    }
            `}
            </style>
        </>
    );
};
