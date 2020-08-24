import { Tooltip } from "antd";
import { instanceOf } from "prop-types";
import { CSSProperties, default as React, useState } from "react";
import { Content, Search } from "../../../Domain/Models/Abstractions";
import { Movie } from "../../../Domain/Models/Movies";
import { TvShow, TvShowCalendar } from "../../../Domain/Models/TvShow";
import { MovieModal, TvShowModal } from "../Modals";

interface IProps {
    item: Content | Search;
    altMessage: string;
    altOnClick?: any;
    style?: CSSProperties;
}

export const Poster: React.FC<IProps> = (props: IProps) => {
    const [movieModalVisible, setMovieModalVisible] = useState<[boolean, Movie]>([false, undefined]);
    const [tvShowModalVisible, setTvShowModalVisible] = useState<[boolean, object]>([false, undefined]);

    return (
        <>
            <MovieModal
                visible={movieModalVisible[0]}
                setVisible={setMovieModalVisible}
                movie={movieModalVisible[1]}
            />
            <TvShowModal
                visible={tvShowModalVisible[0]}
                setVisible={setTvShowModalVisible}
                tvShow={tvShowModalVisible[1] as TvShow}
            />
            {!props.altMessage || props.altMessage !== "none" ? (
                <Tooltip title="View details">
                    <img
                        className="card-img plex"
                        alt=""
                        style={{...props.style, cursor: "pointer"}}
                        src={props.item.posterPath ? `https://image.tmdb.org/t/p/w500/${props.item.posterPath}` : "/static/Images/no_poster.png"}
                        onClick={() => {
                            if ((props.item as Movie).tmdbId) {
                                setMovieModalVisible([true, props.item as Movie]);
                            } else if ((props.item as TvShow).tvdbId) {
                                setTvShowModalVisible([true, props.item as TvShow])
                            }
                        }}
                    />
                </Tooltip>
            ) : (
                <Tooltip title={props.altMessage !== "none" && props.altMessage}>
                    <img
                        className="card-img"
                        alt=""
                        style={props.style}
                        src={props.item.posterPath ? `https://image.tmdb.org/t/p/w500/${props.item.posterPath}` : "/static/Images/no_poster.png"}
                        onClick={() => props.altOnClick && props.altOnClick()}
                    />
                </Tooltip>
            )}
        </>
    );
};
