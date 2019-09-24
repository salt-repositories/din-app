import { NextPageContext } from "next";
import nextCookie from "next-cookies";
import { Router } from "next/router";

export const HandleAuthentication = (context: NextPageContext) => {
    const { token } = nextCookie(context);

    if (context.req && !token) {
        context.res.writeHead(302, { Location: "/"});
        context.res.end();

        return;
    }

    return token;
};
