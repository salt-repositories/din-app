import { deserialize } from "class-transformer";
import { action, Action, thunk, Thunk } from "easy-peasy";
import { Queue } from "../../../Domain/Models/Content";
import { ContentHub, HubProvider } from "../../../Domain/SignalR/Concrete";

export interface IQueueState {
    currentQueue: Queue[];
    getCurrentQueue: Thunk<IQueueState>;
    setCurrentQueue: Action<IQueueState, Queue[]>;
}

export const queueState: IQueueState = {
    currentQueue: [],
    getCurrentQueue: thunk(async (actions) => {
        const contentHub: ContentHub = HubProvider(ContentHub);
        await contentHub.getCurrentQueue((json: string) => {
            actions.setCurrentQueue(deserialize(Queue, json) as unknown as Queue[]);
        });
    }),
    setCurrentQueue: action((state: IQueueState, payload: Queue[]) => {
        state.currentQueue = payload;
    }),
};
