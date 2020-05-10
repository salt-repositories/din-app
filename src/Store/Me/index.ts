import { action, Action, Actions, thunk, Thunk } from "easy-peasy";
import { Account, AddedContent } from "../../Domain/Models/Account";
import { AddedContentQueryResult } from "../../Domain/Models/Account/AddedContentQueryResult";
import { QueryParameters, QueryResult } from "../../Domain/Models/Querying";
import { HttpClient } from "../../Domain/Utils";
import { IRootState } from "../index";

interface ICustomPayload {
    filters?: any;
    queryParameters?: any;
}

export interface IMeState {
    me: Account;
    addedContent: QueryResult<AddedContent>;

    queryParameters: QueryParameters;
    filters: any;

    setParamProp: Action<IMeState, [string, any]>;
    setFilterProp: Action<IMeState, [string, any]>;
    setFilters: Action<IMeState, any>;

    getMeLoading: boolean;
    getMe: Thunk<IMeState, void, any, IRootState, Promise<Account>>;
    setMe: Action<IMeState, Account>;
    setGetMeLoading: Action<IMeState, boolean>;

    getAddedContentLoading: boolean;
    getAddedContent: Thunk<IMeState, ICustomPayload | undefined, any, IRootState, Promise<QueryResult<AddedContent>>>;
    setAddedContent: Action<IMeState, QueryResult<AddedContent>>
    setGetAddedContentLoading: Action<IMeState, boolean>;
}

export const meState: IMeState = {
    me: undefined,
    addedContent: {
        items: [],
        totalCount: undefined,
    },

    queryParameters: new QueryParameters(0, 10),
    filters: {},

    setParamProp: action((state: IMeState, payload: [string, string]) => {
        state.queryParameters[payload[0]] = payload[1];
    }),
    setFilterProp: action((state: IMeState, payload: [string, string]) => {
        state.filters[payload[0]] = payload[1];
    }),
    setFilters: action((state: IMeState, payload: any) => {
        state.filters = payload
    }),

    getMeLoading: false,
    getMe: thunk(async (actions: Actions<IMeState>, _, { getStoreState }) => {
        actions.setGetMeLoading(true);

        const response = await HttpClient.get(`/v1/accounts/${getStoreState().authentication.identity}`, {
            type: Account,
            accessToken: getStoreState().authentication.token.accessToken,
        });

        actions.setMe(response);
        actions.setGetMeLoading(false);

        return response;
    }),
    setMe: action((state: IMeState, payload: Account) => {
        state.me = payload;
    }),
    setGetMeLoading: action((state: IMeState, payload: boolean) => {
        state.getMeLoading = payload;
    }),

    getAddedContentLoading: false,
    getAddedContent: thunk(async (actions: Actions<IMeState>, payload, { getState, getStoreState }) => {
        if (!payload) {
            actions.setGetAddedContentLoading(true);
        }

        const response = await HttpClient.get(`/v1/accounts/${getStoreState().authentication.identity}/added_content`, {
            type: AddedContentQueryResult,
            accessToken: getStoreState().authentication.token.accessToken,
            queryParameters: payload?.queryParameters ?? getState().queryParameters,
            filters: payload?.filters ?? getState().filters,
        });

        if (!payload) {
            actions.setAddedContent(response);
            actions.setGetAddedContentLoading(false);
        }

        return response;
    }),
    setAddedContent: action((state: IMeState, payload: QueryResult<AddedContent>) => {
        state.addedContent = payload;
    }),
    setGetAddedContentLoading: action((state: IMeState, payload: boolean) => {
        state.getAddedContentLoading = payload;
    }),
};
