import { Type } from "class-transformer";
import { QueryResult } from "../Querying";
import { Movie } from "./Movie";

export class MovieQueryResult extends QueryResult<Movie> {
    @Type(() => Movie)
    public items: Movie[];
}
