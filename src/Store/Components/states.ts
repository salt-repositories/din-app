interface IRecentlyAdded {
    showYoutubeModal: boolean;
}

interface IForgotPassword {
    visible: boolean;
    loading: boolean;
    currentTab: number;
}

export interface IComponentsState {
    forgotPassword: IForgotPassword;
    recentlyAdded: IRecentlyAdded;
}

export const ComponentsInitialState: IComponentsState = {
    forgotPassword: {
        visible: false,
        loading: false,
        currentTab: 0,
    },
    recentlyAdded: {
        showYoutubeModal: false,
    },
};

