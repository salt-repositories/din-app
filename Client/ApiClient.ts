import { ApiVersion } from "./Versions";

export default class ApiClient {
    public v1: ApiVersion;

    constructor() {
        this.v1 = new ApiVersion("v1");
    }
}
