import { Expose, Transform, Type } from "class-transformer";
import moment, { Moment } from "moment";
import { Rating } from "../Content/Rating";

export abstract class Content {
    public id: string;
    @Expose({ name: "system_id" })
    public systemId: number;
    @Expose({ name: "imdb_id" })
    public imdbId: string;
    public title: string;
    public overview: string;
    public genres: string[];
    public status: string;
    public downloaded: boolean;
    @Expose({ name: "has_file" })
    public hasFile: boolean;
    public year: string;
    @Transform((value) => moment(value))
    public added: Moment;
    @Expose({ name: "plex_url" })
    public plexUrl: string;
    @Expose({ name: "poster_path" })
    public posterPath: string;
    @Type(() => Rating)
    public ratings: Rating;
}
