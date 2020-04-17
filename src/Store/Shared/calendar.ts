import { Action, action, Actions, thunk, Thunk } from "easy-peasy";
import { Moment } from "moment";
import { IRootState } from "../index";

export interface ICalendar<T> {
    items: T[];
    loading: boolean;

    setLoading: Action<ICalendar<T>, boolean>;
    getItems: Thunk<ICalendar<T>, { from: Moment, till: Moment }, any, IRootState>;
    setItems: Action<ICalendar<T>, T[]>;
}

export const calendar = <T>(
    getMethod: (accessToken: string, from: string, till: string) => Promise<T[]>
): ICalendar<T> => {
    return {
        items: [],
        loading: false,
        setLoading: action((state: ICalendar<T>, payload: boolean) => {
            state.loading = payload;
        }),
        getItems: thunk(async (actions: Actions<ICalendar<T>>, payload, { getStoreState }) => {
            actions.setLoading(true);
            const response = await getMethod(getStoreState().authentication.token.accessToken, payload.from.format("YYYY-MM-DD"), payload.till.format("YYYY-MM-DD"));
            actions.setItems(response);
            actions.setLoading(false);
        }),
        setItems: action((state: ICalendar<T>, payload: T[]) => {
            state.items = payload;
        })
    };
};
