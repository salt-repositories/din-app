import "reflect-metadata";

import { Col, Icon, Row } from "antd";
import { NextPage } from "next";
import Head from "next/dist/next-server/lib/head";
import React from "react";
import { CurrentQueue, DownloadCalendar, RecentlyAdded } from "../../src/Components/Home";
import { withAuthentication } from "../../src/Domain/Authentication";
import { WithMenu } from "../../src/Layouts";
import Layout from "../../src/Layouts/Layout";
import { AppContext } from "../../src/Store/AppContext";

const HomePage: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <WithMenu crumbs={[{name: "Home", icon: <Icon type="home"/>}]}>
                <Col span={24}>
                    <Row>
                        <Col span={15}>
                            <DownloadCalendar/>
                        </Col>
                        <Col span={8} offset={1}>
                            <CurrentQueue/>
                        </Col>
                    </Row>
                </Col>
                <RecentlyAdded/>
            </WithMenu>
        </Layout>
    );
};

HomePage.getInitialProps = async (context: AppContext): Promise<void> => {
    context.store.dispatch.movie.recentlyAddedMovies.setSsr(true);
    context.store.dispatch.movie.recentlyAddedMovies.getRecentlyAdded();
    context.store.dispatch.tvShow.recentlyAddedTvShows.getRecentlyAdded();
};

export default withAuthentication(HomePage);
