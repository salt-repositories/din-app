import { Expose } from "class-transformer";

export class Gif {
    public title: string;
    public url: string;
    @Expose({ name: "mp4_url" })
    public mp4Url: string;
    public frames: number;
    public width: number;
    public height: number;
}
