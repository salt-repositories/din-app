import "reflect-metadata";

import { Col, Icon, Row } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { withAuthentication } from "../../src/Domain/Authentication";
import { WithMenu } from "../../src/Layouts";
import Layout from "../../src/Layouts/Layout";
import { AppContext } from "../../src/Store/AppContext";

interface IProps {

}

const TvShowsPage: NextPage = () => (
    <Layout>
        <Head>
            <title>Movies</title>
        </Head>
        <WithMenu crumbs={[{path: "/TvShows", icon: <Icon type="desktop"/>}]}>
            <Col span={24}>
                <Row>

                </Row>
            </Col>
        </WithMenu>
    </Layout>
);

TvShowsPage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    context.store.dispatch.main.menu.setActiveMenuKey("TvShows");

    return {};
};

export default withAuthentication(TvShowsPage);

