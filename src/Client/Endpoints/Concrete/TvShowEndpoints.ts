import { Endpoints } from "..";
import {ApiVersions} from "../../Versions/Concrete/Versions";

export class TvShowEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "tvshows");
    }
}
