import { Type } from "class-transformer";
import { QueryResult } from "../Querying";
import { TvShow } from "./TvShow";

export class TvShowQueryResult extends QueryResult<TvShow> {
    @Type(() => TvShow)
    public items: TvShow[];
}
