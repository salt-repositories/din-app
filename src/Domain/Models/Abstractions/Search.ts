import { Expose, Transform } from "class-transformer";
import { Rating } from "../Content/Rating";

export abstract class Search {
    @Expose({ name: "title" })
    public title: string;
    @Expose({ name: "original_title" })
    public originalTitle: string;
    @Expose({ name: "tmdb_id" })
    public tmdbId: number;
    @Expose({ name: "poster_path" })
    public posterPath: string;
    public overview: string;
    public genres: string[];
    @Expose({ name: "original_language" })
    public originalLanguage: string;
    @Expose({ name: "vote_average" })
    public voteAverage: number;
    @Expose({ name: "vote_count" })
    public voteCount: number;
}
