import { Hub } from "../Abstractions";

export class MovieHub extends Hub {
    constructor() {
        super("movieHub");
    }

    public async getMovieQueue(callback: (response) => void): Promise<void> {
        await this.callMethod("GetMovieQueue");
        this.createListener("GetMovieQueue", callback);
    }
}
