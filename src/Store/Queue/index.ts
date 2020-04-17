import { deserialize } from "class-transformer";
import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Queue } from "../../Domain/Models/Content";
import { ContentHub, HubProvider } from "../../Domain/SignalR/Concrete";
import { IRootState } from "../index";

export interface IQueueState {
    currentQueue: Queue[];
    getCurrentQueue: Thunk<IQueueState, void, any, IRootState>;
    setCurrentQueue: Action<IQueueState, Queue[]>;
}

export const queueState: IQueueState = {
    currentQueue: [],
    getCurrentQueue: thunk(async (actions: Actions<IQueueState>, _, { getStoreState }) => {
        const contentHub: ContentHub = HubProvider(getStoreState().authentication.token.accessToken, ContentHub);
        await contentHub.getCurrentQueue((json: string) => {
            actions.setCurrentQueue(deserialize(Queue, json) as unknown as Queue[]);
        });
    }),
    setCurrentQueue: action((state: IQueueState, payload: Queue[]) => {
        state.currentQueue = payload;
    }),
};
