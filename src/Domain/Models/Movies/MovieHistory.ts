import { Expose, Transform, Type } from "class-transformer";
import moment, { Moment } from "moment";
import { Movie } from "./Movie";
import { Quality } from "./Quality";

export class MovieHistory {
    public id: number;
    @Expose({ name: "source_title" })
    public sourceTitle: string;
    @Type(() => Quality)
    public quality: Quality;
    @Expose({ name: "quality_cutoff_not_met" })
    public qualityCutoffNotMet: boolean;
    @Transform((value) => moment(value))
    public date: Moment;
    @Expose({ name: "event_type" })
    public eventType: string;
    @Type(() => Movie)
    public movie: Movie;
}
