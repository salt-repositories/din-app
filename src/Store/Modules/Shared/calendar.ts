import { Action, action, Actions, thunk, Thunk } from "easy-peasy";
import { Moment } from "moment";

export interface ICalendar<T> {
    items: T[];
    loading: boolean;

    setLoading: Action<ICalendar<T>, boolean>;
    getItems: Thunk<ICalendar<T>, { from: Moment, till: Moment }>;
}

export const calendar = <T>(getMethod): ICalendar<T> => {
    return {
        items: [],
        loading: false,
        setLoading: action((state: ICalendar<T>, payload: boolean) => {
            state.loading = payload;
        }),
        getItems: thunk(async (actions: Actions<ICalendar<T>>, payload, helpers) => {
            actions.setLoading(true);
            helpers.getState().items = await getMethod(payload.from.format("YYYY-MM-DD"), payload.till.format("YYYY-MM-DD"));
            actions.setLoading(false);
        })
    };
};
