import "reflect-metadata";

import { Button, Icon } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { withAuthentication } from "../../src/Domain/Authentication";
import { ApiException } from "../../src/Domain/Client/Exceptions/ApiException";
import { WithMenu } from "../../src/Layouts";
import Layout from "../../src/Layouts/Layout";
import { AppContext } from "../../src/Store/AppContext";
import { getBackgrounds } from "../../src/Store/Modules/Main";

interface IProps {
}

const MePage: NextPage<IProps> = (props: IProps) => (
    <Layout>
        <Head>
            <title>Me</title>
        </Head>
        <WithMenu crumbs={[{path: "/Me", icon: <Icon type="user"/>}]}>
            <Button onClick={() => {
                throw new ApiException("Test exception", {message: "nothing", details: null});
            }}>
                Throw exception
            </Button>
        </WithMenu>
    </Layout>
);

MePage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    const backgrounds = await getBackgrounds(context);

    return {backgrounds};
};

export default withAuthentication(MePage);
