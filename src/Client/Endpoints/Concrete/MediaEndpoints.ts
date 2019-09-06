import { BackgroundImage, Gif } from "../../../Models";
import { Endpoints } from "../index";

export class MediaEndpoints extends Endpoints {

    constructor(version: string) {
        super(version, "media");
    }

    public async getBackgrounds(): Promise<BackgroundImage[]> {
        return await this.call("backgrounds", BackgroundImage, true) as BackgroundImage[];
    }

    public async getGifsByTag(tag: string): Promise<Gif> {
        return await this.call(`gif?tag=${tag}`, Gif) as Gif;
    }
}
