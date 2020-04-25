import "reflect-metadata";

import { Button, Icon } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { withAuthentication } from "../../src/Domain/Authentication";
import { Layout, WithMenu } from "../../src/Layouts";
import { AppContext } from "../../src/Store/AppContext";

interface IProps {
}

const MePage: NextPage<IProps> = (props: IProps) => (
    <Layout>
        <Head>
            <title>Me</title>
        </Head>
        <WithMenu crumbs={[{path: "/Me", icon: <Icon type="user"/>}]}>
            <Button onClick={() => {
                throw new Error("test")
            }}>
                Throw
            </Button>
        </WithMenu>
    </Layout>
);

MePage.getInitialProps = async (context: AppContext): Promise<{}> => {
    context.store.dispatch.main.menu.setActiveMenuKey("Me");

    return {};
};

export default withAuthentication(MePage);
