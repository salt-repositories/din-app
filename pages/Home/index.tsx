import "reflect-metadata";

import * as Sentry from "@sentry/node";
import { Col, Icon, Row } from "antd";
import { NextPage } from "next";
import Head from "next/dist/next-server/lib/head";
import React from "react";
import { CurrentQueue, DownloadCalendar, RecentlyAdded, ToBeDownloaded } from "../../src/Components/Home";
import { MobileHome } from "../../src/Components/Home/Mobile/MobileHome";
import { MINIMAL_WIDTH } from "../../src/Components/Shared/consts";
import { withAuthentication } from "../../src/Domain/Authentication";
import { Layout, WithMenu } from "../../src/Layouts";
import { IRootState, useStoreState } from "../../src/Store";
import { AppContext } from "../../src/Store/AppContext";

Sentry.addBreadcrumb({
    category: "pages/Home",
    message: `Preparing app (${process.browser ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
});

const MINIMAL_QUEUE_WIDTH = 1530;

const HomePage: NextPage = () => {
    const windowWidth = useStoreState((state: IRootState) => state.main.windowWidth);

    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            {windowWidth < MINIMAL_WIDTH ? (
                <MobileHome/>
            ) : (
                <WithMenu crumbs={[{path: "/Home", icon: <Icon type="home"/>}]}>
                    <Col span={24}>
                        <Row>
                            <Col span={15}>
                                <DownloadCalendar/>
                            </Col>
                            <Col span={8} offset={1}>
                                {windowWidth > MINIMAL_QUEUE_WIDTH && (
                                    <CurrentQueue/>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <RecentlyAdded/>
                        </Row>
                        <Row>
                            <ToBeDownloaded/>
                        </Row>
                    </Col>
                </WithMenu>
            )}
        </Layout>
    );
};

HomePage.getInitialProps = async (context: AppContext): Promise<void> => {
    context.store.dispatch.main.menu.setActiveMenuKey("Home");

    const state: IRootState = context.store.getState();

    await Promise.all([
        state.movie.recentlyAddedMovies.collection.items.length === 0 ? context.store.dispatch.movie.recentlyAddedMovies.get() : null,
        state.tvShow.recentlyAddedTvShows.collection.items.length === 0 ? context.store.dispatch.tvShow.recentlyAddedTvShows.get() : null,
        state.movie.toBeDownloadedMovies.collection.items.length === 0 ? context.store.dispatch.movie.toBeDownloadedMovies.get() : null,
    ]);
};

export default withAuthentication(HomePage);
