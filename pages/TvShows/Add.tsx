import "reflect-metadata";

import { Col, Icon } from "antd";
import { Actions } from "easy-peasy";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SearchContent } from "../../src/Components/Shared/Search/SearchContent";
import { withAuthentication } from "../../src/Domain/Authentication";
import { Layout, WithMenu } from "../../src/Layouts";
import { IRootState, useStoreActions, useStoreState } from "../../src/Store";
import { AppContext } from "../../src/Store/AppContext";

const AddTvShowPage: NextPage = () => {
    const results = useStoreState((state: IRootState) => state.tvShow.search.results);
    const searchLoading = useStoreState((state: IRootState) => state.tvShow.search.loading);
    const addLoading = useStoreState((state: IRootState) => state.tvShow.addToSystemLoading);

    const search = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.search.search);
    const addTvShow = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.addToSystem);

    return (
        <Layout>
            <Head>
                <title>Add TvShow</title>
            </Head>
            <WithMenu
                crumbs={[{path: "/TvShows", icon: <Icon type="desktop"/>}, {path: "/TvShows/Add", name: "Add"}]}>
                <Col span={24}>
                    <SearchContent
                        searchMethod={search}
                        searchLoading={searchLoading}
                        addMethod={addTvShow}
                        addLoading={addLoading}
                        results={results}
                        searchString="Enter the title of the tv show"
                        addString="Add Tv Shows"
                        addedString="Added tv show"
                    />
                </Col>
            </WithMenu>
        </Layout>
    );
};

AddTvShowPage.getInitialProps = async (context: AppContext) => {
    context.store.dispatch.main.menu.setActiveMenuKey("TvShows");
};

export default withAuthentication(AddTvShowPage);
