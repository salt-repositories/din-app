import { Expose, Transform, Type } from "class-transformer";
import moment, { Moment } from "moment";
import { SeasonSearch } from "./SeasonSearch";

export class TvShowSearch {
    @Expose({ name: "tvdb_id" })
    public tvdbId: number;
    public name: string;
    @Expose({ name: "original_name" })
    public originalName: string;
    @Expose({ name: "first_air_date" })
    @Transform((value) => moment(value))
    public firstAirDate: Moment;
    @Type(() => SeasonSearch)
    public seasons: SeasonSearch[];
    @Expose({ name: "tmdb_id" })
    public tmdbId: number;
    public overview: string;
    @Expose({ name: "poster_path" })
    public posterPath: string;
    public genres: string[];
    @Expose({ name: "original_language" })
    public originalLanguage: string;
    @Expose({ name: "vote_average" })
    public voteAverage: number;
    @Expose({ name: "vote_count" })
    public voteCount: number;
}
