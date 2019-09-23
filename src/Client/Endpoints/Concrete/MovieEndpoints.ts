import { Endpoints } from "..";
import {ApiVersions} from "../../Versions/Concrete/Versions";

export class MovieEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "movies");
    }
}
