import { Expose, Transform, Type } from "class-transformer";
import moment, { Moment } from "moment";
import { Search } from "../Abstractions/Search";
import { SeasonSearch } from "./SeasonSearch";

export class TvShowSearch extends Search {
    @Expose({ name: "tvdb_id" })
    public tvdbId: number;
    @Expose({ name: "first_air_date" })
    @Transform((value) => moment(value))
    public firstAirDate: Moment;
    @Type(() => SeasonSearch)
    public seasons: SeasonSearch[];
}
