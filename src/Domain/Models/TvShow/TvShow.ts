import { Expose, Type } from "class-transformer";
import { Content } from "../Abstractions";
import { Season } from "./Season";

export class TvShow extends Content {
    @Expose({ name : "tvdb_id" })
    public tvdbId: number;
    @Expose({ name: "season_count" })
    public seasonCount: number;
    @Expose({ name: "total_episode_count" })
    public totalEpisodeCount: number;
    @Expose({ name: "episode_count" })
    public episodeCount: number;
    public network: string;
    @Expose({ name: "air_time" })
    public airTime: string;
    @Type(() => Season)
    public seasons: Season[];
}
