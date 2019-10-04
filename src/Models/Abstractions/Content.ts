import { Expose, Transform, Type } from "class-transformer";
import moment, { Moment } from "moment";

export abstract class Content {
    public id: number;
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
}
