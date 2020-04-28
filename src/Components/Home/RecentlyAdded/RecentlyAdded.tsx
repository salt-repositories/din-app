import { Actions } from "easy-peasy";
import { ReactNode } from "react";
import * as React from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { HorizontalCardContainer } from "../../Shared/Containers/HorizontalCardContainer";
import { HorizontalContentContainer } from "../../Shared/Containers/HorizontalContentContainer";


export const RecentlyAdded = (): JSX.Element => {
    const nextMovies = useStoreActions((actions: Actions<IRootState>) => actions.movie.recentlyAddedMovies.next);
    const movies = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.collection);
    const nextMoviesLoading = useStoreState((state: IRootState) => state.movie.recentlyAddedMovies.nextLoading);

    const nextTvShows = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.recentlyAddedTvShows.next);
    const tvShows = useStoreState((state: IRootState) => state.tvShow.recentlyAddedTvShows.collection);
    const nextTvShowsLoading = useStoreState((state: IRootState) => state.tvShow.recentlyAddedTvShows.nextLoading);

    const options: [string, ReactNode][] = [
        [
            "Movies",
            <HorizontalCardContainer
                items={movies.items}
                nextLoading={nextMoviesLoading}
                nextFunction={nextMovies}
            />
        ],
        [
            "TvShows",
            <HorizontalCardContainer
                items={tvShows.items}
                nextLoading={nextTvShowsLoading}
                nextFunction={nextTvShows}
            />
        ]
    ];

    return (
        <HorizontalContentContainer
            title="Recently Added"
            selectOptions={options}
            defaultSelectOption="Movies"
        />
    );
};
