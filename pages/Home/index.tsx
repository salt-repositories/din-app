import "reflect-metadata";

import * as Sentry from "@sentry/node";
import { Col, Icon, Row } from "antd";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/dist/next-server/lib/head";
import React from "react";
import { CurrentQueue, DownloadCalendar, RecentlyAdded } from "../../src/Components/Home";
import { withAuthentication } from "../../src/Domain/Authentication";
import { WithMenu } from "../../src/Layouts";
import Layout from "../../src/Layouts/Layout";
import { IRootState } from "../../src/Store";
import { AppContext } from "../../src/Store/AppContext";

Sentry.addBreadcrumb({
    category: "pages/Home",
    message: `Preparing app (${process.browser ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
});

const HomePage: NextPage = () => (
    <Layout>
        <Head>
            <title>Home</title>
        </Head>
        <WithMenu crumbs={[{path: "/Home", icon: <Icon type="home"/>}]}>
            <Col span={24}>
                <Row>
                    <Col span={15}>
                        <DownloadCalendar/>
                    </Col>
                    <Col span={8} offset={1}>
                        <CurrentQueue/>
                    </Col>
                </Row>
                <Row>
                    <RecentlyAdded/>
                </Row>
            </Col>
        </WithMenu>
    </Layout>
);

HomePage.getInitialProps = async (context: AppContext): Promise<void> => {
    context.store.dispatch.main.menu.setActiveMenuKey("Home");

    const state: IRootState = context.store.getState();

    await Promise.all([
        state.movie.recentlyAddedMovies.items.length === 0 ? context.store.dispatch.movie.recentlyAddedMovies.getRecentlyAdded() : null,
        state.tvShow.recentlyAddedTvShows.items.length === 0 ? context.store.dispatch.tvShow.recentlyAddedTvShows.getRecentlyAdded() : null,
    ]);
};

export default withAuthentication(HomePage);
