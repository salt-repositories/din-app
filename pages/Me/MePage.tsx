import "reflect-metadata";

import { NextPage } from "next";
import Head from "next/head";
import React from "react";
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

const MePage: NextPage<IProps> = (props: IProps) => {
    return (
        <Layout>
            <Head>
                <title>Me</title>
            </Head>
            <FullScreenCarousel
                backgrounds={props.backgrounds}
            />
            <SideMenu/>
        </Layout>
    );
};

MePage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    const backgrounds = await getBackgrounds(context);

    return {backgrounds};
};

export default withAuthentication(MePage);
