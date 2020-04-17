import { action, Action } from "easy-peasy";

interface IForgotPassword {
    visible: boolean;
    setVisible: Action<IForgotPassword, boolean>;
    loading: boolean;
    setLoading: Action<IForgotPassword, boolean>;
    currentTab: number;
    setCurrentTab: Action<IForgotPassword, number>;
}

export interface IComponentsState {
    forgotPassword: IForgotPassword;
}

export const componentsState: IComponentsState = {
    forgotPassword: {
        visible: false,
        setVisible: action((state: IForgotPassword, payload: boolean) => {
            state.visible = payload;
        }),
        loading: false,
        setLoading: action((state: IForgotPassword, payload: boolean) => {
            state.loading = payload;
        }),
        currentTab: 0,
        setCurrentTab: action((state: IForgotPassword, payload: number) => {
            state.currentTab = payload;
        }),
    },
};

