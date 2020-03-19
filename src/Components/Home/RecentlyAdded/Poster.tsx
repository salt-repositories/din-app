import { Tooltip } from "antd";
import { CSSProperties, default as React } from "react";
import { Content } from "../../../Domain/Models/Abstractions";

interface IProps {
    item: Content;
    noPlexMatchMessage: string;
    style?: CSSProperties;
}

export const Poster: React.FC<IProps> = (props: IProps) => (
    <>
        {props.item.plexUrl ? (
            <Tooltip title="Open on Plex">
                <img
                    className="card-img plex"
                    alt=""
                    style={{...props.style, cursor: "pointer"}}
                    src={props.item.posterPath ? `https://image.tmdb.org/t/p/w500/${props.item.posterPath}` : "https://i.imgur.com/kofVyyQ.png?1"}
                    onClick={() => window.open(props.item.plexUrl)}
                />
            </Tooltip>
        ) : (
            <Tooltip title={props.noPlexMatchMessage}>
                <img
                    className="card-img"
                    alt=""
                    style={props.style}
                    src={props.item.posterPath ? `https://image.tmdb.org/t/p/w500/${props.item.posterPath}` : "https://i.imgur.com/kofVyyQ.png?1"}
                />
            </Tooltip>
        )}
    </>
);
