import { Expose } from "class-transformer";

export class SeasonSearch {
    @Expose({ name: "season_number" })
    public seasonNumber: number;
    public episodeCount: number;
    @Expose({ name: "poster_path" })
    public posterPath: string;
}
