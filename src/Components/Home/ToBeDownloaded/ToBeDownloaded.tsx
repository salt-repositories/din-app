import { Actions } from "easy-peasy";
import React, { ReactNode } from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { HorizontalCardContainer } from "../../Shared/Containers/HorizontalCardContainer";
import { HorizontalContentContainer } from "../../Shared/Containers/HorizontalContentContainer";

export const ToBeDownloaded: React.FC = () => {
    const nextMovies = useStoreActions((actions: Actions<IRootState>) => actions.movie.toBeDownloadedMovies.next);
    const movies = useStoreState((state: IRootState) => state.movie.toBeDownloadedMovies.collection);
    const nextMoviesLoading = useStoreState((state: IRootState) => state.movie.toBeDownloadedMovies.nextLoading);

    const options: [string, ReactNode][] = [
        [
            "Movies",
            <HorizontalCardContainer
                items={movies.items}
                message="Show history"
                nextLoading={nextMoviesLoading}
                nextFunction={nextMovies}
                history={true}
            />
        ]
    ];

    return (
        <HorizontalContentContainer
            title="To Be Downloaded"
            selectOptions={options}
            defaultSelectOption="Movies"
        />
    );
};
