import "reflect-metadata";

import { NextPage } from "next";
import Head from "next/dist/next-server/lib/head";
import Router from "next/router";
import { destroyCookie } from "nookies";
import React, { useState } from "react";
import { withAuthentication } from "../../src/Authentication";
import { ApiClientProvider } from "../../src/Client";
import { RecentlyAddedMovies } from "../../src/Components/Home";
import FullScreenCarousel from "../../src/Components/Shared/FullScreenCarousel";
import { Menu } from "../../src/Components/Shared/Menu";
import { AppContext } from "../../src/Context/AppContext";
import Layout from "../../src/Layouts/Layout";
import { BackgroundImage } from "../../src/Models";
import { MainActions } from "../../src/Store/Main/actions";
import { BackgroundProvider } from "../../src/Store/Providers";


interface IProps {
    backgroundImages: BackgroundImage[];
    context: AppContext;
}

const apiClient = ApiClientProvider.getClient();

const HomePage: NextPage = (props: IProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onclick = () => {
        destroyCookie({}, "token");
        Router.push("/");
    };

    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <FullScreenCarousel
                backgrounds={props.backgroundImages}
            />
            <Menu/>
            <span onClick={() => onclick()} style={{position: "absolute", right: "0"}}>
                LOGOUT
            </span>
            <div style={{overflow: "hidden"}}>
                <RecentlyAddedMovies />
            </div>
        </Layout>
    );
};

HomePage.getInitialProps = async (context: AppContext) => {
    context.store.dispatch(MainActions.setActiveMenuItem(context.pathname));

    const backgroundImages = await BackgroundProvider(context);

    return { backgroundImages };

};

export default withAuthentication(HomePage);
