import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { withAuthentication } from "../../src/Authentication";
import { Menu } from "../../src/Components/Shared/Menu";
import Layout from "../../src/Layouts/Layout";

const MePage: NextPage = (props) => {
    return (
        <Layout>
            <Head>
                <title>me</title>
            </Head>
            <Menu/>
        </Layout>
    );
};

export default withAuthentication(MePage);
