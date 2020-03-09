import { Card } from "antd";
import { Actions } from "easy-peasy";
import { default as React, useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { Spinner } from "../../Shared/Spinner";
import { ImdbIcon, PlexIcon } from "./Icons";

export const TvShowsContainer: React.FC = (): JSX.Element => {
    const recentlyAddedTvShows = useStoreState((state: IRootState) => state.tvShow.recentlyAddedTvShows.items);
    const loading = useStoreState((state: IRootState) => state.tvShow.recentlyAddedTvShows.loading);

    const getRecentlyAddedTvShows = useStoreActions((actions: Actions<IRootState>) =>
        actions.tvShow.recentlyAddedTvShows.getRecentlyAdded);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.recentlyAddedTvShows.next);

    useEffect(() => {
        if (recentlyAddedTvShows.length <= 0 && !loading) {
            getRecentlyAddedTvShows();
        }
    }, []);

    return (
        <>
            {recentlyAddedTvShows.length > 0 ? (
                <>
                    {recentlyAddedTvShows.map((item) => (
                        <Card
                            key={item[0].id}
                            className="container-item"
                            cover={
                                <img
                                    className="card-img plex"
                                    alt=""
                                    src={item[1] ? `https://image.tmdb.org/t/p/w500/${item[1].posterPath}` : "https://i.imgur.com/kofVyyQ.png?1"}
                                    onClick={() => window.open(item[0].plexUrl)}
                                />
                            }
                        >
                            <Card.Meta
                                title={item[0].title}
                                description={item[0].year}
                            />
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
                    ))}
                    <div className="container-item">
                        {loading && (
                            <Spinner marginTop={0} marginBottom={10}/>
                        )}
                        <Waypoint horizontal={true} onEnter={() => next()}/>
                    </div>
                </>
            ) : (
                <Spinner/>
            )}
        </>
    );
};
