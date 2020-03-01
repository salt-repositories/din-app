type SortDirection = "Asc" | "Desc";

export class QueryParameters {
    public skip: number;
    public take: number;
    public sortBy: string;
    public sortDirection: SortDirection;

    constructor(skip?: number, take?: number, sortBy?: string, sortDirection?: SortDirection) {
        this.skip = skip || 0;
        this.take = take || 20;
        this.sortBy = sortBy || "";
        this.sortDirection = sortDirection || "Asc";
    }
}
