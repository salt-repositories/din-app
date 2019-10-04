import { NextPage } from "next";
import Head from "next/dist/next-server/lib/head";
import Router from "next/router";
import { destroyCookie } from "nookies";
import React, { useState } from "react";
import { HandleAuthentication } from "../../src/Authentication/Authentication";
import { ApiClientProvider } from "../../src/Client";
import { RecentlyAddedMovies } from "../../src/Components/Home/RecentlyAdded/RecentlyAdded";
import FullScreenCarousel from "../../src/Components/Shared/FullScreenCarousel";
import { AppContext } from "../../src/Context/AppContext";
import Layout from "../../src/Layouts/Layout";
import { BackgroundImage } from "../../src/Models";
import { BackgroundProvider } from "../../src/Store/Providers";


interface IProps {
    backgroundImages: BackgroundImage[];
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
            <div>
                <span onClick={() => onclick()}>
                    LOGOUT
                </span>
                <RecentlyAddedMovies/>
            </div>
        </Layout>
    );
};

HomePage.getInitialProps = async (context: AppContext) => {
    await HandleAuthentication(context);

    const backgroundImages = await BackgroundProvider(context);

    return { backgroundImages };

};

export default HomePage;
