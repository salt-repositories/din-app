import { Type } from "class-transformer";
import { QueryResult } from "../Querying";
import { AddedContent } from "./AddedContent";

export class AddedContentQueryResult extends QueryResult<AddedContent> {
    @Type(() => AddedContent)
    public items: AddedContent[];
}
