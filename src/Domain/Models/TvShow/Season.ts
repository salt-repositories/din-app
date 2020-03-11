import { Type } from "class-transformer";
import { Statistics } from "./Statistics";

export class Season {
    public seasonNumber: number;
    @Type(() => Statistics)
    public statistics: Statistics;
}
