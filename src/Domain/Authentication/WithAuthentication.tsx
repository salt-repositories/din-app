import React from "react";
import { AppContext } from "../../Store/AppContext";
import { HandleAuthentication } from "./HandleAuthentication";

export const withAuthentication = (Page) => {
    return class extends React.Component {
        public static async getInitialProps(context: AppContext) {
            await HandleAuthentication(context);

            if (Page.getInitialProps) {
                return Page.getInitialProps(context);
            }

            return {};
        }

        public render() {
            return <Page {...this.props}/>;
        }
    };
};
