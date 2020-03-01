import { Expose } from "class-transformer";
import { Content } from "../Abstractions";

export class Movie extends Content {
    @Expose({ name: "tmdb_id" })
    public tmdbId: string;
    @Expose({ name: "youtube_trailer_id" })
    public youtubeTrailerId: string;
    public studio: string;
    @Expose({ name: "in_cinemas" })
    public inCinemas: Date;
    @Expose({ name: "physical_release" })
    public physicalRelease: Date;
}
