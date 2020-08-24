import "reflect-metadata";

import { PlusSquareOutlined, VideoCameraOutlined } from "@ant-design/icons/lib";
import { Button, Col, Row } from "antd";
import { Actions } from "easy-peasy";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import { HeaderFilters } from "../../src/Components/Movies/HeaderFilters";
import { ContentCard } from "../../src/Components/Shared/Cards/ContentCard";
import { FooterBar } from "../../src/Components/Shared/FooterBar/FooterBar";
import { YoutubeModal } from "../../src/Components/Shared/Modals";
import { Spinner } from "../../src/Components/Shared/Spinner";
import { withAuthentication } from "../../src/Domain/Authentication";
import { Movie } from "../../src/Domain/Models/Movies";
import { Layout, WithMenu } from "../../src/Layouts";
import { IRootState, useStoreActions, useStoreState } from "../../src/Store";
import { AppContext } from "../../src/Store/AppContext";

interface IProps {

}

const MoviesPage: NextPage = () => {
    const movies = useStoreState((state: IRootState) => state.movie.movies.collection);
    const getLoading = useStoreState((state: IRootState) => state.movie.movies.getLoading);
    const nextLoading = useStoreState((state: IRootState) => state.movie.movies.nextLoading);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.next);

    const getMovies = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.get);
    const setParamProp = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.setParamProp);
    const setFilterProp = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.setFilterProp);

    const [showYoutubeModal, setShowYoutubeModal] = useState<[boolean, string]>([false, undefined]);

    const openYoutubeModal = (id: string): void => {
        setShowYoutubeModal([true, id]);
    };

    return (
        <Layout>
            <Head>
                <title>Movies</title>
            </Head>
            <WithMenu crumbs={[{path: "/Movies", icon: <VideoCameraOutlined/>}]}>
                <Col span={24}>
                    <YoutubeModal data={showYoutubeModal} setData={setShowYoutubeModal}/>
                    <Row>
                        <HeaderFilters
                            getMethod={getMovies}
                            setParamsPropMethod={setParamProp}
                            setFiltersPropMethod={setFilterProp}
                            totalCount={movies.totalCount}/>
                    </Row>
                    <Row style={{marginTop: "5em"}}>
                        {getLoading ? (
                            <Spinner/>
                        ) : (
                            movies.items.map((movie: Movie) => (
                                <ContentCard
                                    key={movie.id}
                                    item={movie}
                                    openYoutubeModal={openYoutubeModal}
                                />
                            ))
                        )}
                        <div style={{display: "inline-block", overflow: "hidden", height: "17em", margin: "20px"}}>
                            {nextLoading && !getLoading && (
                                <Spinner marginTop={0} marginBottom={10}/>
                            )}
                            <Waypoint
                                onEnter={() => next()}
                            />
                        </div>
                    </Row>
                    <Row>
                        <FooterBar
                            buttons={[
                                (
                                    <Button key="add-movie">
                                        <Link href="/Movies/Add">
                                            <a>
                                                <PlusSquareOutlined/>
                                                Add Movie
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

MoviesPage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    context.store.dispatch.main.menu.setActiveMenuKey("Movies");
    if (context.store.getState().movie.movies.collection.items.length < 50) {
        context.store.dispatch.movie.movies.setParamProp(["skip", 0]);
        context.store.dispatch.movie.movies.setParamProp(["take", 50]);
        context.store.dispatch.movie.movies.get();
    }
    return {};
};

export default withAuthentication(MoviesPage);

