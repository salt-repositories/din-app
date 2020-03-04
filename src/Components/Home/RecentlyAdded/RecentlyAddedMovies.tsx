import { Card, Icon, Row, Tooltip } from "antd";
import { Actions } from "easy-peasy";
import { useEffect, useState } from "react";
import * as React from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { Spinner } from "../../Shared/Spinner";
import { YoutubeModal } from "../../Shared/YoutubeModal";
import { ImdbIcon, PlexIcon } from "./Icons";

export const RecentlyAddedMovies = (): JSX.Element => {
    const recentlyAddedMovies = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies);
    const showYoutubeModal = useStoreState((state: IRootState) => state.components.recentlyAdded.showYoutubeModal);

    const getRecentlyAddedMovies = useStoreActions((actions: Actions<IRootState>) =>
        actions.movie.getRecentlyAddedMovies);
    const setShowYoutubeModal = useStoreActions((actions: Actions<IRootState>) =>
        actions.components.recentlyAdded.setShowYoutubeModal);

    const [trailerId, setTrailerId] = useState<string>();

    useEffect(() => {
        if (recentlyAddedMovies.length <= 0) {
            getRecentlyAddedMovies();
        }
    });

    const openYoutubeModal = (id: string): void => {
        setTrailerId(id);
        setShowYoutubeModal(true);
    };

    return (
        <Card
            className="recently-added"
        >
            <YoutubeModal visible={showYoutubeModal} trailerId={trailerId}/>
            <h1 className="card-title">Recently Added Movies</h1>
            <div className="horizontal-container">
                <Row className="row">
                    {recentlyAddedMovies.length > 0 ? (
                        recentlyAddedMovies.map((item) => (
                            <Card
                                key={item[0].id}
                                className="container-item"
                                cover={
                                    item[0].plexUrl ? (
                                        <Tooltip title="Open on Plex">
                                            <img
                                                className="card-img plex"
                                                alt=""
                                                src={`https://image.tmdb.org/t/p/w500/${item[1].posterPath}`}
                                                onClick={() => window.open(item[0].plexUrl)}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="This movie has not been downloaded">
                                            <img
                                                className="card-img"
                                                alt=""
                                                src={`https://image.tmdb.org/t/p/w500/${item[1].posterPath}`}
                                            />
                                        </Tooltip>
                                    )
                                }
                            >
                                <Card.Meta
                                    title={item[0].title}
                                    description={item[0].year}
                                />
                                <span
                                    className="trailer-link"
                                    onClick={() => openYoutubeModal(item[0].youtubeTrailerId)}
                                >
                                        <Icon type="youtube" className="logo"/>
                                        Trailer
                                </span>
                                {item[0].plexUrl ? (
                                    <span
                                        className="plex-link"
                                        onClick={() => window.open(item[0].plexUrl)}
                                    >
                                        <PlexIcon className="logo"/>
                                        Plex
                                    </span>
                                ) : (
                                    <span
                                        className="imdb-link"
                                        onClick={() => window.open(`https://imdb.com/title/${item[0].imdbId}`)}
                                    >
                                        <ImdbIcon className="logo"/>
                                        IMDb
                                    </span>
                                )}
                            </Card>
                        ))
                    ) : (
                        <Spinner/>
                    )}
                </Row>
            </div>
            <style jsx>
                {`
                    :global(.recently-added) {
                        position: fixed;
                        bottom: 2em;
                        right: 2em;
                        border-radius: 5px;
                        border: none;
                        width: 90vw;
                        height: 400px;
                        background: #2b2b2ba8;
                        margin: auto auto auto 8vw;
                    }
                    
                    :global(.recently-added .card-title) {
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                        width: 95%;
                        margin: 0 auto;
                    }
                    
                    :global(.horizontal-container) {
                        margin: 0 auto;
                        width: 95%;
                        height: 100%;
                        overflow-x: scroll;
                        overflow-y: hidden;
                        white-space: nowrap;
                        scrollbar-width: none;z
                    }
                    
                    :global(.horizontal-container > .row) {
                        flex-wrap: nowrap;
                        height: 100%;
                        margin-left: 0;
                        margin-right: 0;
                    }
                    
                    .horizontal-container::-webkit-scrollbar {
                        display: none;
                    }
                    
                    :global(.horizontal-container > .row > .container-item) {
                        background: transparent;
                        min-width: 130px;
                        margin: 10px;
                        border: none;
                        overflow: hidden;
                    }
                    
                    :global(.container-item) {
                        width: 130px;
                        display: inline-block;
                    }
                    
                    :global(.container-item .card-img) {
                        height: 185px;
                    }
                    
                    :global(.container-item .plex:hover) {
                        cursor: pointer
                    }
                    
                    :global(.container-item > .ant-card-body) {
                        padding: 24px 0 24px 0;
                    }
                    
                    :global(.container-item > .ant-card-body .ant-card-meta-title) {
                        height: 28px;
                        color: #fff;
                        overflow-wrap: break-word;
                        word-wrap: break-word;
                        hyphens: auto;
                        font-size: 12px;
                        margin-bottom: 0;
                    }
                    
                    :global(.container-item > .ant-card-body .ant-card-meta-description) {
                        color: #9d7751;
                        margin-bottom: 7px;
                    }
                    
                    :global(.container-item .trailer-link) {
                        color: #dbd6ce;
                        font-size: 12px;
                    }
                    
                    :global(.container-item .trailer-link:hover) {
                        cursor: pointer
                    }
                    
                    :global(.container-item .trailer-link .logo) {
                        width: 20px;
                        color: #df1818;
                        margin-right: 5px;
                    }
                    
                    :global(.container-item .plex-link) {
                        color: #dbd6ce;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                    
                    :global(.container-item .plex-link:hover) {
                        cursor: pointer
                    }
                    
                    :global(.container-item .plex-link .logo) {
                        width: 13px;
                        height: 13px;
                        color: #df1818;
                        margin-right: 5px;
                    }
                    
                    :global(.container-item .imdb-link) {
                        color: #dbd6ce;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                    
                    :global(.container-item .imdb-link:hover) {
                        cursor: pointer
                    }
                    
                    :global(.container-item .imdb-link .logo) {
                        width: 20px;
                        height: 12px;
                        color: #df1818;
                        margin-right: 5px;
                    }
                `}
            </style>
        </Card>
    );
};
