import { Expose, Transform } from "class-transformer";
import moment, { Moment } from "moment";
import { Content } from "../Abstractions";

export class Movie extends Content {
    @Expose({ name: "tmdb_id" })
    public tmdbId: string;
    @Expose({ name: "youtube_trailer_id" })
    public youtubeTrailerId: string;
    public studio: string;
    @Expose({ name: "in_cinemas" })
    @Transform((value) => moment(value))
    public inCinemas: Moment;
    @Expose({ name: "physical_release" })
    @Transform((value) => moment(value))
    public physicalRelease: Moment;
}
