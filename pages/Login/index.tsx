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
import { getBackgrounds } from "../../src/Store/Main";

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
    const promise = getBackgrounds(context);
    const {username} = parseCookies(context);

    const backgrounds = await promise;

    return {username, backgrounds};
};

export default withAuthentication(LoginPage);

