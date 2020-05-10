import { Moment } from "moment";

export interface IAddedContentRow {
    id: string;
    systemId: number;
    foreignId: number;
    title: string;
    type: string;
    status: string;
    dateAdded: Moment;
}
