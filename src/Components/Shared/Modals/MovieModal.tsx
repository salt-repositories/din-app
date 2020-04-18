import { Button, Col, Divider, Icon, Modal, Row, Statistic } from "antd";
import { default as React, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Movie } from "../../../Domain/Models/Movies";
import { ImdbIcon, PlexIcon } from "../../Home/RecentlyAdded/Icons";
import { Poster } from "../../Home/RecentlyAdded/Poster";
import { Spinner } from "../Spinner";
import { YoutubeModal } from "./YoutubeModal";

interface IProps {
    visible: boolean;
    setVisible: (value: [boolean, Movie]) => void;
    movie: Movie;
}

export const MovieModal: React.FC<IProps> = (props: IProps) => {
    const [showYoutubeModal, setShowYoutubeModal] = useState<[boolean, string]>([false, undefined]);

    const openYoutubeModal = (id: string): void => {
        setShowYoutubeModal([true, id]);
    };

    return (
        <>
            <YoutubeModal data={showYoutubeModal} setData={setShowYoutubeModal}/>
            <Modal
                className="movie-modal"
                visible={props.visible}
                onOk={() => props.setVisible([false, undefined])}
                onCancel={() => props.setVisible([false, undefined])}
                footer={<Button type="primary" onClick={() => props.setVisible([false, undefined])}>Close</Button>}
            >
                {props.movie ? (
                    <Row>
                        <Col span={10}>
                            <Poster
                                item={props.movie}
                                noPlexMatchMessage="Not downloaded"
                                style={{width: "100%", borderRadius: "4px"}}
                            />
                        </Col>
                        <Col span={13} offset={1}>
                            <Row className="movie-header">
                                <Scrollbars
                                    className="content-title-wrapper"
                                    universal={true}
                                    autoHeight={true}
                                >
                                    <span className="content-title">{props.movie.title}</span>
                                </Scrollbars>
                                <span className="year">({props.movie.year})</span>
                            </Row>
                            <Divider/>
                            <Scrollbars autoHeight={true} autoHeightMax="22.9em" universal={true}>
                                <Row className="movie-rating">
                                    <Col span={6}>
                                        <Statistic title="Rating" value={props.movie.ratings.value} suffix="/ 10"/>
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title="Total votes" value={props.movie.ratings.votes}/>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row className="general-information">
                                    <Col span={7}>
                                        <Row>
                                            <span className="header">Studio:</span>
                                        </Row>
                                        <span>{props.movie.studio}</span>
                                    </Col>
                                    <Col span={8} offset={1}>
                                        <Row>
                                            <span className="header">In cinema:</span>
                                        </Row>
                                        <span>{props.movie.inCinemas.format("DD-MM-YYYY")}</span>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <span className="header">Physical release:</span>
                                        </Row>
                                        <span>{props.movie.physicalRelease.format("DD-MM-YYYY")}</span>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row className="movie-information">
                                    <span className="overview-title">Overview</span>
                                    <p className="overview-body">{props.movie.overview}</p>
                                </Row>
                            </Scrollbars>
                            <Divider/>
                            <Row className="movie-icons">
                                <Col
                                    className="icon-wrapper"
                                    span={8}
                                    onClick={() => window.open(`https://imdb.com/title/${props.movie.imdbId}`)}
                                >
                                    <ImdbIcon className="icon"/>
                                    <span>IMDb</span>
                                </Col>
                                <Col
                                    className="icon-wrapper"
                                    span={8}
                                    onClick={() => openYoutubeModal(props.movie.youtubeTrailerId)}
                                >
                                    <Icon type="youtube" className="youtube-icon"/>
                                    <span>Trailer</span>
                                </Col>
                                {props.movie.plexUrl && (
                                    <Col
                                        className="icon-wrapper"
                                        span={8}
                                        onClick={() => window.open(props.movie.plexUrl)}
                                    >
                                        <PlexIcon className="plex-icon"/>
                                        <span>Plex</span>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                ) : (
                    <Spinner/>
                )}
            </Modal>
            <style jsx>
                {`
                    :global(.movie-modal) {
                        width: 60em !important;
                        color: #fff;
                    }
                    
                    :global(.movie-modal .ant-divider) {
                        background: #858585;
                    }
                    
                    :global(.movie-modal .ant-modal-content) {
                        background: #414141f0;
                        border: none;
                    }
                    
                    :global(.movie-modal .ant-modal-footer) {
                        border: none;
                    }
                    
                    :global(.movie-header .content-title) {
                        color: #ff8d1c;
                        float: left;
                        font-size: 30px;
                        text-shadow: 1px 1px #000;
                    }
                    
                    :global(.movie-header .year) {
                        color: #ff8d1c99;
                        float: left;
                        line-height: 3.4;
                        margin-left: 10px;
                    }
                    
                    :global(.movie-modal .movie-rating .ant-statistic-title) {
                        color: #ff8d1c99;
                    }
                    
                    :global(.movie-modal .movie-rating .ant-statistic-content) {
                        color: #fff;
                    }
                    
                    :global(.general-information .header) {
                        color: #ff8d1cb3;
                    }
                    
                    :global(.movie-information .overview-title) {
                        color: #ff8d1cb3;
                        font-size: 23px;
                        font-weight: bold;
                    }
                    
                    :global(.movie-information .overview-body) {
                        color: #fff;
                        margin-top: 10px;
                    }
                    
                    :global(.movie-icons .icon-wrapper) {
                        cursor: pointer;
                    }
                    
                    :global(.movie-icons .icon) {
                        float:left;
                        width: 40px;
                    }
                    
                    :global(.movie-icons .plex-icon) {
                        float:left;
                        width: 20px;
                    }

                    :global(.movie-icons .youtube-icon) {
                        font-size: 20px;
                        float: left;
                        color: #df1818;
                    }
                    
                    :global(.movie-icons span) {
                       float: left;
                       margin-left: 10px;
                    }
                `}
            </style>
        </>
    );
};
