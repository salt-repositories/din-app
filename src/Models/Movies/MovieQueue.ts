import { Type } from "class-transformer";
import { Queue } from "../Abstractions";
import { Movie } from "./Movie";

export class MovieQueue extends Queue {
    @Type(() => Movie)
    public movie: Movie;
}
