import { NextPage } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React from "react";
import { withAuthentication } from "../../src/Authentication";
import { ForgotPasswordModal, LoginForm } from "../../src/Components/Login";
import FullScreenCarousel from "../../src/Components/Shared/FullScreenCarousel";
import { AppContext } from "../../src/Context/AppContext";
import Layout from "../../src/Layouts/Layout";
import { BackgroundImage } from "../../src/Models";
import { BackgroundProvider } from "../../src/Store/Providers";

interface IProps {
    username: string;
    rememberUsername: string;
    backgrounds: BackgroundImage[];
}

const LoginPage: NextPage = (props: IProps): JSX.Element => {
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <FullScreenCarousel
                backgrounds={props.backgrounds}
            />
            <LoginForm
                username={props.username}
                rememberUsername={props.rememberUsername === "true"}
            />
            <ForgotPasswordModal/>
        </Layout>
    );
};

LoginPage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    const {rememberUsername, username} = parseCookies(context);
    const backgrounds = await BackgroundProvider(context);

    return {username, rememberUsername, backgrounds};
};

export default withAuthentication(LoginPage);

