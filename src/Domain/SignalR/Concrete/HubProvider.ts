import { Hub } from "../Abstractions";

let instance;

export function HubProvider<T extends Hub>(hub: new () => T) {
    if (!instance) {
        instance = new hub();
    }

    return instance;
}
