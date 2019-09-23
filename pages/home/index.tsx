import "reflect-metadata";

import {NextPage, NextPageContext} from "next";
import Head from "next/head";
import React, {useState} from "react";
import ForgotPasswordModal from "../../src/Components/Home/ForgotPasswordModal";
import LoginForm from "../../src/Components/Home/LoginForm";
import Layout from "../../Layouts/Layout";
import ApiClient from "../../src/Client/ApiClient";
import FullScreenCarousel from "../../src/Components/Home/FullScreenCarousel";
import {BackgroundImage} from "../../src/Models";

const apiClient = new ApiClient();

interface IProps {
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
            <LoginForm handler={setShowPasswordModal}/>
            <ForgotPasswordModal show={showPasswordModal}/>
        </Layout>
    );
};

export default HomePage;

HomePage.getInitialProps = async (context: NextPageContext): Promise<IProps> => {
    const backgrounds = await apiClient.v1.media.getBackgrounds();

    return { backgrounds };
};

