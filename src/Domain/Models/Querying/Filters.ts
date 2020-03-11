export class Filters {
    public title: string;
    public status: string;
    public downloaded: string;
    public year: string;
    public plex: boolean;
    public poster: boolean;

    constructor(title?: string, status?: string, downloaded?: string, year?: string, plex?: boolean, poster?: boolean) {
        this.title = title || "";
        this.status = status || "";
        this.downloaded = downloaded || "";
        this.year = year || "";
        this.plex = plex || false;
        this.poster = poster || false;
    }
}
