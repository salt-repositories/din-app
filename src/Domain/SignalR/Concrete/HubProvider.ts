import { Hub } from "../Abstractions";

let instance;

export function HubProvider<T extends Hub>(accessToken: string, hub: new (accessToken: string) => T) {
    if (!instance) {
        instance = new hub(accessToken);
    }

    return instance;
}
