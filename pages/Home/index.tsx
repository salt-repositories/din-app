import "reflect-metadata";

import { HomeOutlined } from "@ant-design/icons/lib";
import { Col, Row } from "antd";
import { NextPage } from "next";
import Head from "next/dist/next-server/lib/head";
import React from "react";
import { CurrentQueue, DownloadCalendar, RecentlyAdded, ToBeDownloaded } from "../../src/Components/Home";
import { MobileHome } from "../../src/Components/Home/Mobile/MobileHome";
import { MINIMAL_QUEUE_WIDTH, MINIMAL_WIDTH } from "../../src/Components/Shared/consts";
import { withAuthentication } from "../../src/Domain/Authentication";
import { Layout, WithMenu } from "../../src/Layouts";
import { IRootState, useStoreState } from "../../src/Store";
import { AppContext } from "../../src/Store/AppContext";

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
                <WithMenu crumbs={[{path: "/Home", icon: <HomeOutlined/>}]}>
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

    await context.store.dispatch.movie.recentlyAddedMovies.get();
    await context.store.dispatch.tvShow.recentlyAddedTvShows.get();
    await context.store.dispatch.movie.toBeDownloadedMovies.get();
};

export default withAuthentication(HomePage);
