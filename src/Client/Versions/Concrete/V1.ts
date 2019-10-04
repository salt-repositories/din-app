import { IApiVersion } from "..";
import {
    AccountEndpoints,
    AuthenticationEndpoints,
    MediaEndpoints,
    MovieEndpoints,
    TvShowEndpoints,
} from "../../Endpoints";
import { ApiVersions } from "./Versions";

export class V1 implements IApiVersion {
    public accounts: AccountEndpoints;
    public authentication: AuthenticationEndpoints;
    public movies: MovieEndpoints;
    public tvShows: TvShowEndpoints;
    public media: MediaEndpoints;

    constructor() {
        this.accounts = new AccountEndpoints(ApiVersions.V1);
        this.authentication = new AuthenticationEndpoints(ApiVersions.V1);
        this.movies = new MovieEndpoints(ApiVersions.V1);
        this.tvShows = new TvShowEndpoints(ApiVersions.V1);
        this.media = new MediaEndpoints(ApiVersions.V1);
    }
}
