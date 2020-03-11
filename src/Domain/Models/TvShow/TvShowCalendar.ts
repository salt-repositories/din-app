import { Expose, Transform, Type } from "class-transformer";
import moment, { Moment } from "moment";
import { TvShow } from "./TvShow";

export class TvShowCalendar {
    public id: number;
    @Expose({ name: "tv_show_id"})
    public tvShowId: number;
    @Expose({ name: "season_number"})
    public seasonNumber: number;
    @Expose({ name: "episode_number"})
    public episodeNumber: number;
    public title: string;
    public overview: string;
    @Expose({ name: "air_date_utc"})
    @Transform((value) => moment(value))
    public airDateUtc: Moment;
    @Expose({ name: "air_date"})
    @Transform((value) => moment(value))
    public airDate: Moment;
    @Expose({ name: "has_file"})
    public hasFile: boolean;
    public monitored: boolean;
    @Expose({ name: "tv_show"})
    @Type(() => TvShow)
    public tvShow: TvShow;
}
