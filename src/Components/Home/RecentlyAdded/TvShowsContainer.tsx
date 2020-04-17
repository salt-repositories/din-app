import { Card } from "antd";
import { Actions } from "easy-peasy";
import { default as React } from "react";
import { Waypoint } from "react-waypoint";
import { TvShow } from "../../../Domain/Models/TvShow";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { Spinner } from "../../Shared/Spinner";
import { ImdbIcon, PlexIcon } from "./Icons";
import { Poster } from "./Poster";

export const TvShowsContainer: React.FC = (): JSX.Element => {
    const recentlyAddedTvShows = useStoreState((state: IRootState) => state.tvShow.recentlyAddedTvShows.items);
    const loading = useStoreState((state: IRootState) => state.tvShow.recentlyAddedTvShows.loading);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.recentlyAddedTvShows.next);

    return (
        <>
            {recentlyAddedTvShows.length > 0 ? (
                <>
                    {recentlyAddedTvShows.map((item: TvShow) => (
                        <Card
                            key={item.id}
                            className="container-item"
                            cover={<Poster item={item} noPlexMatchMessage="This tv show has not been downloaded or was not matched"/>}
                        >
                            <Card.Meta
                                title={item.title}
                                description={item.year}
                            />
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
