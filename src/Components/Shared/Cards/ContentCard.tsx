import { Card, Icon } from "antd";
import React, { ReactNode } from "react";
import { Content, Search } from "../../../Domain/Models/Abstractions";
import { Movie } from "../../../Domain/Models/Movies";
import { ImdbIcon, PlexIcon } from "../../Home/RecentlyAdded/Icons";
import { Poster } from "./Poster";

interface IProps {
    item: Content | Search;
    openYoutubeModal?: (id: string) => void;
    info?: ReactNode;
    message?: string;
    history?: boolean;
    setShowHistoryModal?: (value: [boolean, number]) => void;
}

export const ContentCard: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <>
            <Card
                key={props.item.title}
                className="container-item"
                cover={
                    <Poster
                        item={props.item}
                        altMessage={props.message ?? "This movies has not been downloaded"}
                        altOnClick={() => props.history && props.setShowHistoryModal && (props.item as Content).id && props.setShowHistoryModal([true, (props.item as Content).id])}
                    />
                }
            >
                <Card.Meta
                    title={props.item.title}
                    description={(props.item as Content).year ?? ""}
                />
                {props.info ? (
                    props.info
                ) : (
                    <>
                        {(props.item as Movie).youtubeTrailerId && (
                            <span
                                className="trailer-link"
                                onClick={() => props.openYoutubeModal((props.item as Movie).youtubeTrailerId)}
                            >
                                <Icon type="youtube" className="logo"/>
                                Trailer
                            </span>
                        )}
                        {(props.item as Content).plexUrl ? (
                            <span
                                className="plex-link"
                                onClick={() => window.open((props.item as Content).plexUrl)}
                            >
                                <PlexIcon className="logo"/>
                                Plex
                            </span>
                        ) : (props.item as Content).imdbId ? (
                            <span
                                className="imdb-link"
                                onClick={() => window.open(`https://imdb.com/title/${(props.item as Content).imdbId}`)}
                            >
                                <ImdbIcon className="logo"/>
                                IMDb
                            </span>
                        ) : (
                            <span className="no-link"/>
                        )}
                    </>
                )}
            </Card>
            < style jsx>
                {`
                    :global(.container-item) {
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
                        color: #ff8d1c99;
                        margin-bottom: 7px;
                    }
                    
                    :global(.container-item .trailer-link) {
                        color: #dbd6ce;
                        font-size: 12px;
                        margin-right: 10px;
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
                    
                    :global(.container-item .no-link) {
                        height: 21px;
                        display: block;
                    }
                `}
            </style>
        </>
    );
};
