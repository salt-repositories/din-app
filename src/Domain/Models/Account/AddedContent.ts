import { Expose, Transform } from "class-transformer";
import moment, { Moment } from "moment";

export class AddedContent {
    public id: string;
    @Expose({ name: "system_id"})
    public systemId: number;
    @Expose({ name: "foreign_id" })
    public foreignId: number;
    public title: string;
    public type: string;
    @Expose({ name: "date_added" })
    @Transform((value) => moment(value))
    public dateAdded: Moment;
    public status: string;
}
