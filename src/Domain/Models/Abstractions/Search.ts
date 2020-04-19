import { Expose } from "class-transformer";

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
