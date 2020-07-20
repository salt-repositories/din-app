import "reflect-metadata";

import { Button, Col, Icon, Row } from "antd";
import { Actions } from "easy-peasy";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Waypoint } from "react-waypoint";
import { HeaderFilters } from "../../src/Components/Movies/HeaderFilters";
import { ContentCard } from "../../src/Components/Shared/Cards/ContentCard";
import { FooterBar } from "../../src/Components/Shared/FooterBar/FooterBar";
import { Spinner } from "../../src/Components/Shared/Spinner";
import { withAuthentication } from "../../src/Domain/Authentication";
import { TvShow } from "../../src/Domain/Models/TvShow";
import { Layout, WithMenu } from "../../src/Layouts";
import { IRootState, useStoreActions, useStoreState } from "../../src/Store";
import { AppContext } from "../../src/Store";

interface IProps {

}

const TvShowsPage: NextPage = () => {
    const tvShows = useStoreState((state: IRootState) => state.tvShow.tvShows.collection);
    const getLoading = useStoreState((state: IRootState) => state.tvShow.tvShows.getLoading);
    const nextLoading = useStoreState((state: IRootState) => state.tvShow.tvShows.nextLoading);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.tvShows.next);

    const getTvShows = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.tvShows.get);
    const setParamProp = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.tvShows.setParamProp);
    const setFilterProp = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.tvShows.setFilterProp);

    return (
        <Layout>
            <Head>
                <title>Tv Shows</title>
            </Head>
            <WithMenu crumbs={[{path: "/TvShows", icon: <Icon type="desktop"/>}]}>
                <Col span={24}>
                    <Row>
                        <HeaderFilters
                            getMethod={getTvShows}
                            setParamsPropMethod={setParamProp}
                            setFiltersPropMethod={setFilterProp}
                            totalCount={tvShows.totalCount}/>
                    </Row>
                    <Row style={{marginTop: "5em"}}>
                        {getLoading ? (
                            <Spinner/>
                        ) : (
                            tvShows.items.map((tvShow: TvShow) => (
                                <ContentCard
                                    key={tvShow.id}
                                    item={tvShow}
                                />
                            ))
                        )}
                        <div style={{display: "inline-block", overflow: "hidden", height: "17em", margin: "20px"}}>
                            {nextLoading && !getLoading && (
                                <Spinner marginTop={0} marginBottom={10}/>
                            )}
                            {tvShows.items.length < tvShows.totalCount && (
                                <Waypoint
                                    onEnter={() => next()}
                                />
                            )}
                        </div>
                    </Row>
                    <Row>
                        <FooterBar
                            buttons={[
                                (
                                    <Button key="add-tvshow">
                                        <Link href="/TvShows/Add">
                                            <a>
                                                <Icon type="plus-square"/>
                                                Add Tv Show
                                            </a>
                                        </Link>
                                    </Button>
                                )
                            ]}
                        />
                    </Row>
                </Col>
            </WithMenu>
        </Layout>
    );
};

TvShowsPage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    context.store.dispatch.main.menu.setActiveMenuKey("TvShows");

    if (context.store.getState().tvShow.tvShows.collection.items.length < 50) {
        context.store.dispatch.tvShow.tvShows.setParamProp(["skip", 0]);
        context.store.dispatch.tvShow.tvShows.setParamProp(["take", 50]);
        context.store.dispatch.tvShow.tvShows.get();
    }

    return {};
};

export default withAuthentication(TvShowsPage);

