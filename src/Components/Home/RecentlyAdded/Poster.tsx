import { Tooltip } from "antd";
import { default as React } from "react";
import { Content } from "../../../Domain/Models/Abstractions";

interface IProps {
    item: Content;
    noPlexMatchMessage: string;
}

export const Poster: React.FC<IProps> = (props: IProps) => (
    <>
        {props.item.plexUrl ? (
            <Tooltip title="Open on Plex">
                <img
                    className="card-img plex"
                    alt=""
                    src={props.item.posterPath ? `https://image.tmdb.org/t/p/w500/${props.item.posterPath}` : "https://i.imgur.com/kofVyyQ.png?1"}
                    onClick={() => window.open(props.item.plexUrl)}
                />
            </Tooltip>
        ) : (
            <Tooltip title={props.noPlexMatchMessage}>
                <img
                    className="card-img"
                    alt=""
                    src={props.item.posterPath ? `https://image.tmdb.org/t/p/w500/${props.item.posterPath}` : "https://i.imgur.com/kofVyyQ.png?1"}
                />
            </Tooltip>
        )}
    </>
);
