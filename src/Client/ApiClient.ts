import {IApiVersion, V1} from "./Versions";

export default class ApiClient {
    public v1: IApiVersion;

    constructor() {
        this.v1 = new V1();
    }
}
