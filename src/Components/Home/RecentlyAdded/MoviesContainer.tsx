import { Card, Icon } from "antd";
import { Actions } from "easy-peasy";
import { default as React, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Movie } from "../../../Domain/Models/Movies";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { Spinner } from "../../Shared/Spinner";
import { YoutubeModal } from "../../Shared/YoutubeModal";
import { ImdbIcon, PlexIcon } from "./Icons";
import { Poster } from "./Poster";

export const MoviesContainer: React.FC = (): JSX.Element => {
    const recentlyAddedMovies = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.items);
    const loading = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.loading);
    const ssr = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.ssr);

    const getRecentlyAddedMovies = useStoreActions((actions: Actions<IRootState>) =>
        actions.movie.recentlyAddedMovies.getRecentlyAdded);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.movie.recentlyAddedMovies.next);

    const [showYoutubeModal, setShowYoutubeModal] = useState<[boolean, string]>([false, undefined]);

    useEffect(() => {
        if (recentlyAddedMovies.length <= 0 && !loading && !ssr) {
            getRecentlyAddedMovies();
        }
    }, []);

    const openYoutubeModal = (id: string): void => {
        setShowYoutubeModal([true, id]);
    };

    return (
        <>
            <YoutubeModal data={showYoutubeModal} setData={setShowYoutubeModal}/>
            {recentlyAddedMovies.length > 0 ? (
                <>
                    {recentlyAddedMovies.map((item: Movie) => (
                        <Card
                            key={item.id}
                            className="container-item"
                            cover={<Poster item={item} noPlexMatchMessage="This movies has not been downloaded"/>}
                        >
                            <Card.Meta
                                title={item.title}
                                description={item.year}
                            />
                            <span
                                className="trailer-link"
                                onClick={() => openYoutubeModal(item.youtubeTrailerId)}
                            >
                                <Icon type="youtube" className="logo"/>
                                Trailer
                            </span>
                            {item.plexUrl ? (
                                <span
                                    className="plex-link"
                                    onClick={() => window.open(item.plexUrl)}
                                >
                                    <PlexIcon className="logo"/>
                                    Plex
                                </span>
                            ) : (
                                <span
                                    className="imdb-link"
                                    onClick={() => window.open(`https://imdb.com/title/${item.imdbId}`)}
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
