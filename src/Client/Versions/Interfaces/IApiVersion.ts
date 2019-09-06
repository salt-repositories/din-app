import {
    AccountEndpoints,
    AuthenticationEndpoints,
    MediaEndpoints,
    MovieEndpoints,
    TvShowEndpoints,
} from "../../Endpoints";

export interface IApiVersion {
    accounts: AccountEndpoints;
    authentication: AuthenticationEndpoints;
    media: MediaEndpoints;
    movies: MovieEndpoints;
    tvShows: TvShowEndpoints;
}
