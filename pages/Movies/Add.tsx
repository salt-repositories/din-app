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

const AddMoviePage: NextPage = () => {
    const results = useStoreState((state: IRootState) => state.movie.search.results);
    const searchLoading = useStoreState((state: IRootState) => state.movie.search.loading);
    const addLoading = useStoreState((state: IRootState) => state.movie.addToSystemLoading);

    const search = useStoreActions((actions: Actions<IRootState>) => actions.movie.search.search);
    const addMovie = useStoreActions((actions: Actions<IRootState>) => actions.movie.addToSystem);

    return (
        <Layout>
            <Head>
                <title>Add Movie</title>
            </Head>
            <WithMenu
                crumbs={[{path: "/Movies", icon: <Icon type="video-camera"/>}, {path: "/Movies/Add", name: "Add"}]}>
                <Col span={24}>
                    <SearchContent
                        searchMethod={search}
                        searchLoading={searchLoading}
                        addMethod={addMovie}
                        addLoading={addLoading}
                        results={results}
                        searchString="Enter the title of the movie"
                        addString="Add Movies"
                    />
                </Col>
            </WithMenu>
        </Layout>
    );
};

AddMoviePage.getInitialProps = async (context: AppContext) => {
    context.store.dispatch.main.menu.setActiveMenuKey("Movies");
};

export default withAuthentication(AddMoviePage);
