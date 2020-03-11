import { Store } from "easy-peasy";
import { NextPageContext } from "next";
import { IRootState } from "./index";

export type AppContext = NextPageContext & {
    readonly store: Store<IRootState>;
};
