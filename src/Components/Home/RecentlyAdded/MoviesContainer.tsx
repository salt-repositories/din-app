import { Actions } from "easy-peasy";
import { default as React, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Movie } from "../../../Domain/Models/Movies";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { ContentCard } from "../../Shared/Cards/ContentCard";
import { YoutubeModal } from "../../Shared/Modals";
import { Spinner } from "../../Shared/Spinner";

export const MoviesContainer: React.FC = (): JSX.Element => {
    const recentlyAddedMovies = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.items);
    const loading = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.loading);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.movie.recentlyAddedMovies.next);

    const [showYoutubeModal, setShowYoutubeModal] = useState<[boolean, string]>([false, undefined]);

    const openYoutubeModal = (id: string): void => {
        setShowYoutubeModal([true, id]);
    };

    return (
        <>
            <YoutubeModal data={showYoutubeModal} setData={setShowYoutubeModal}/>
            {recentlyAddedMovies.length > 0 ? (
                <>
                    {recentlyAddedMovies.map((item: Movie) => (
                        <ContentCard
                            key={item.id}
                            item={item}
                            openYoutubeModal={openYoutubeModal}
                        />
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
