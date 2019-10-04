import { NextPageContext } from "next";
import { Store } from "redux";

export type AppContext = NextPageContext & {
    readonly store: Store;
};
