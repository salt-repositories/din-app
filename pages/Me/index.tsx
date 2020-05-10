import "reflect-metadata";

import { Icon } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AddedContent } from "../../src/Components/Me/AddedContent/AddedContent";
import { UserInfo } from "../../src/Components/Me/UserInfo/UserInfo";
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
            <UserInfo/>
            <AddedContent/>
        </WithMenu>
    </Layout>
);

MePage.getInitialProps = async (context: AppContext): Promise<{}> => {
    context.store.dispatch.main.menu.setActiveMenuKey("Me");

    return {};
};

export default withAuthentication(MePage);
