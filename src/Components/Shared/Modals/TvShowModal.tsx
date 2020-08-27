import { Button, Col, Divider, Modal, Row, Statistic } from "antd";
import { default as React } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Episode, TvShow } from "../../../Domain/Models/TvShow";
import { ImdbIcon, PlexIcon } from "../../Home/RecentlyAdded/Icons";
import { Poster } from "../Cards/Poster";
import { Spinner } from "../Spinner";

interface IProps {
    visible: boolean;
    setVisible: (value: [boolean, object]) => void;
    tvShow?: TvShow;
    episode?: Episode;
}

export const TvShowModal: React.FC<IProps> = (props: IProps) => {
    const tvShow = props.tvShow ?? props.episode?.tvShow;

    return (
        <>
            <Modal
                className="movie-modal"
                visible={props.visible}
                onOk={() => props.setVisible([false, undefined])}
                onCancel={() => props.setVisible([false, undefined])}
                footer={<Button type="primary" onClick={() => props.setVisible([false, undefined])}>Close</Button>}
            >
                {tvShow ? (
                    <Row>
                        <Col span={10}>
                            <Poster
                                item={tvShow}
                                altMessage="Not downloaded"
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
                                    <span className="content-title">{tvShow.title}</span>
                                </Scrollbars>
                                <span className="year">({tvShow.year})</span>
                            </Row>
                            {props.episode && (
                                <Row>
                                     <span className="content-subtitle">
                                        S{props.episode.seasonNumber}E{props.episode.episodeNumber} - {props.episode.title}
                                    </span>
                                </Row>
                            )}
                            <Divider/>
                            <Scrollbars autoHeight={true} autoHeightMax="21em" universal={true}>
                                <Row className="movie-rating">
                                    <Col span={6}>
                                        <Statistic title="Rating" value={tvShow.ratings.value} suffix="/ 10"/>
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title="Total votes" value={tvShow.ratings.votes}/>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row className="general-information">
                                    <Col span={8}>
                                        <Row>
                                            <span className="header">Network:</span>
                                        </Row>
                                        <span>{tvShow.network}</span>
                                    </Col>
                                    {props.episode && (
                                        <Col span={8}>
                                            <Row>
                                                <span className="header">Air date:</span>
                                            </Row>
                                            <span>{props.episode.airDate.format("DD-MM-YYYY")}</span>
                                        </Col>
                                    )}
                                    <Col span={8}>
                                        <Row>
                                            <span className="header">Added:</span>
                                        </Row>
                                        <span>{tvShow.added.format("DD-MM-YYYY")}</span>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row className="movie-information">
                                    <span className="overview-title">Overview</span>
                                    <p className="overview-body">
                                        {
                                            props.episode && props.episode.overview
                                                ? props.episode.overview
                                                : tvShow.overview
                                        }
                                    </p>
                                </Row>
                            </Scrollbars>
                            <Divider/>
                            <Row className="movie-icons">
                                <Col
                                    className="icon-wrapper"
                                    span={8}
                                    onClick={() => window.open(`https://imdb.com/title/${tvShow.imdbId}`)}
                                >
                                    <ImdbIcon className="icon"/>
                                    <span>IMDb</span>
                                </Col>
                                {tvShow.plexUrl && (
                                    <Col
                                        className="icon-wrapper"
                                        span={8}
                                        onClick={() => window.open(tvShow.plexUrl)}
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
                        background: #313131e0;
                        border: none;
                    }
                    
                    :global(.movie-modal .ant-modal-footer) {
                        border: none;
                    }
                    
                    :global(.movie-header .content-title-wrapper) {
                        float:left;
                        white-space: nowrap;
                        width: unset !important;
                        max-width: 80% !important;
                    }
                    
                    :global(.movie-header .content-title) {
                        color: #ff8d1c;
                        font-size: 30px;
                        text-shadow: 1px 1px #000;
                    }
                    
                    :global(.movie-header .year) {
                        color: #ff8d1c99;
                        float: left;
                        line-height: 3.4;
                        margin-left: 10px;
                    }
                    
                    :global(.content-subtitle) {
                        font-size: 16px;
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
                    
                    :global(.movie-icons span) {
                       float: left;
                       margin-left: 10px;
                    }
                `}
            </style>
        </>
    );
};
