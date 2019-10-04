import { NextPage } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { HandleAuthentication } from "../../src/Authentication/Authentication";
import ForgotPasswordModal from "../../src/Components/Login/ForgotPasswordModal/ForgotPasswordModal";
import LoginForm from "../../src/Components/Login/LoginForm/LoginForm";
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
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

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
                modalHandler={setShowPasswordModal}
            />
            <ForgotPasswordModal visible={showPasswordModal} modalHandler={setShowPasswordModal}/>
        </Layout>
    );
};


LoginPage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    await HandleAuthentication(context);

    const { rememberUsername, username } = parseCookies(context);
    const backgrounds = await BackgroundProvider(context);

    return { username, rememberUsername, backgrounds };
};

export default LoginPage;

