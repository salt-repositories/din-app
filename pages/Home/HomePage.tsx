import "reflect-metadata";

import { NextPage } from "next";
import Head from "next/dist/next-server/lib/head";
import React from "react";
import { CurrentQueue, RecentlyAdded } from "../../src/Components/Home";
import FullScreenCarousel from "../../src/Components/Shared/FullScreenCarousel";
import { SideMenu } from "../../src/Components/Shared/SideMenu";
import { withAuthentication } from "../../src/Domain/Authentication";
import { BackgroundImage } from "../../src/Domain/Models/Media";
import Layout from "../../src/Layouts/Layout";
import { AppContext } from "../../src/Store/AppContext";
import { getBackgrounds } from "../../src/Store/Modules/Main";

interface IProps {
    backgrounds: BackgroundImage[];
}

const HomePage: NextPage<IProps> = (props: IProps) => {
    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <FullScreenCarousel
                backgrounds={props.backgrounds}
            />
            <SideMenu/>
            <div style={{overflow: "hidden"}}>
                <CurrentQueue/>
                <RecentlyAdded/>
            </div>
        </Layout>
    );
};

HomePage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    const backgrounds = await getBackgrounds(context);

    return {backgrounds};
};

export default withAuthentication(HomePage);
