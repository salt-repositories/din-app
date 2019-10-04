import { Expose } from "class-transformer";

export class QueryResult<T> {
    public items: T[];
    @Expose({ name: "total_count" })
    public totalCount: number;
}
