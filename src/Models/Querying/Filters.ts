export class Filters {
    public title: string;
    public status: string;
    public downloaded: string;
    public year: string;


    constructor(title: string, status: string, downloaded: string, year: string) {
        this.title = title || "";
        this.status = status || "";
        this.downloaded = downloaded || "";
        this.year = year || "";
    }
}
