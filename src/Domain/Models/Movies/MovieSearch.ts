import { Expose, Transform } from "class-transformer";
import moment, { Moment } from "moment";

export class MovieSearch {
    public title: string;
    @Expose({ name: "original_title" })
    public originalTitle: string;
    @Expose({ name: "release_date" })
    @Transform((value) => moment(value))
    public releaseDate: Moment;
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
