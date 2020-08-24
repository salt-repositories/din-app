import "reflect-metadata";

import { NextPage } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React from "react";
import { ForgotPasswordModal, LoginForm } from "../../src/Components/Login";
import FullScreenCarousel from "../../src/Components/Shared/FullScreenCarousel";
import { withAuthentication } from "../../src/Domain/Authentication";
import { BackgroundImage } from "../../src/Domain/Models/Media";
import { Layout } from "../../src/Layouts";
import { AppContext } from "../../src/Store/AppContext";

interface IProps {
    username: string;
    backgrounds: BackgroundImage[];
}

const LoginPage: NextPage<IProps> = (props: IProps): JSX.Element => (
    <Layout>
        <Head>
            <title>Login</title>
        </Head>
        <FullScreenCarousel
            backgrounds={props.backgrounds}
        />
        <LoginForm
            username={props.username}
        />
        <ForgotPasswordModal/>
    </Layout>
);

LoginPage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    const { username } = parseCookies(context);
    await context.store.dispatch.main.backgroundImages.getBackgroundImages();

    return { username, backgrounds: context.store.getState().main.backgroundImages.items };
};

export default withAuthentication(LoginPage);

