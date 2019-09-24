import "reflect-metadata";

import { NextPage, NextPageContext } from "next";
import nextCookie from "next-cookies";
import Head from "next/head";
import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import { ApiClientProvider } from "../../src/Client";
import ForgotPasswordModal from "../../src/Components/Home/ForgotPasswordModal/ForgotPasswordModal";
import FullScreenCarousel from "../../src/Components/Home/FullScreenCarousel";
import LoginForm from "../../src/Components/Home/LoginForm/LoginForm";
import { BackgroundImage } from "../../src/Models";

const apiClient = ApiClientProvider.getClient();

interface IProps {
    username: string;
    rememberUsername: string;
    backgrounds: BackgroundImage[];
}

const HomePage: NextPage = (props: IProps): JSX.Element => {
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <FullScreenCarousel backgrounds={props.backgrounds}/>
            <LoginForm
                username={props.username}
                rememberUsername={props.rememberUsername === "true"}
                modalHandler={setShowPasswordModal}
            />
            <ForgotPasswordModal visible={showPasswordModal} modalHandler={setShowPasswordModal}/>
        </Layout>
    );
};

export default HomePage;

HomePage.getInitialProps = async (context: NextPageContext): Promise<IProps> => {
    const { rememberUsername, username } = nextCookie(context);
    const backgrounds = await apiClient.v1.media.getBackgrounds();

    return { username, rememberUsername, backgrounds };
};

