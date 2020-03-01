import "reflect-metadata";

import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SideMenu } from "../../src/Components/Shared/SideMenu";
import { withAuthentication } from "../../src/Domain/Authentication";
import Layout from "../../src/Layouts/Layout";

const MePage: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Me</title>
            </Head>
            <SideMenu/>
        </Layout>
    );
};

export default withAuthentication(MePage);
