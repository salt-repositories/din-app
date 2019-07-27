import {
    AccountEndpoints,
    AuthenticationEndpoints,
    MediaEndpoints,
    MovieEndpoints,
    TvShowEndpoints,
} from "../../Endpoints";
import { IApiVersion } from "../../Versions";

export class ApiVersion implements IApiVersion {
    public accounts: AccountEndpoints;
    public authentication: AuthenticationEndpoints;
    public movies: MovieEndpoints;
    public tvShows: TvShowEndpoints;
    public media: MediaEndpoints;

    constructor(version: string) {
        this.media = new MediaEndpoints(version);
    }
}
