import { Endpoints } from "../../index";
import { ApiVersions } from "../../../Versions/Concrete/Versions";

export class TvShowEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "tvshows");
    }
}
