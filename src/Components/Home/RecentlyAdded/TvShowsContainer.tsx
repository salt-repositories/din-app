import { Actions } from "easy-peasy";
import { default as React } from "react";
import { Waypoint } from "react-waypoint";
import { TvShow } from "../../../Domain/Models/TvShow";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { ContentCard } from "../../Shared/Cards/ContentCard";
import { Spinner } from "../../Shared/Spinner";

export const TvShowsContainer: React.FC = (): JSX.Element => {
    const recentlyAddedTvShows = useStoreState((state: IRootState) => state.tvShow.recentlyAddedTvShows.items);
    const loading = useStoreState((state: IRootState) => state.tvShow.recentlyAddedTvShows.loading);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.recentlyAddedTvShows.next);

    return (
        <>
            {recentlyAddedTvShows.length > 0 ? (
                <>
                    {recentlyAddedTvShows.map((item: TvShow) => (
                        <ContentCard
                            key={item.id}
                            item={item}
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
