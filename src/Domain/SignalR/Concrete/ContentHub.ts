import { Hub } from "../Abstractions";

export class ContentHub extends Hub {
    constructor(accessToken: string) {
        super(accessToken, "content");
    }

    public async getCurrentQueue(callback: (response: string) => void): Promise<void> {
        await this.callMethod("GetCurrentQueue");
        this.createListener("GetCurrentQueue", callback);
    }
}
