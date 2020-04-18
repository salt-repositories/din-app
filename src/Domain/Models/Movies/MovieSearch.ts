import { Expose, Transform } from "class-transformer";
import moment, { Moment } from "moment";
import { Search } from "../Abstractions";

export class MovieSearch extends Search {
    @Expose({ name: "release_date" })
    @Transform((value) => moment(value))
    public releaseDate: Moment;
}
