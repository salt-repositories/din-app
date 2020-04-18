import "reflect-metadata";

import { Button, Checkbox, Col, Icon, Input, message, Row } from "antd";
import { Actions } from "easy-peasy";
import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { ContentCard } from "../../src/Components/Shared/Cards/ContentCard";
import { FooterBar } from "../../src/Components/Shared/FooterBar/FooterBar";
import { Spinner } from "../../src/Components/Shared/Spinner";
import { withAuthentication } from "../../src/Domain/Authentication";
import { Movie, MovieSearch } from "../../src/Domain/Models/Movies";
import { WithMenu } from "../../src/Layouts";
import Layout from "../../src/Layouts/Layout";
import { IRootState, useStoreActions, useStoreState } from "../../src/Store";
import { AppContext } from "../../src/Store/AppContext";

const AddMoviePage: NextPage = () => {
    const results = useStoreState((state: IRootState) => state.movie.search.results);
    const searchLoading = useStoreState((state: IRootState) => state.movie.search.loading);
    const addLoading = useStoreState((state: IRootState) => state.movie.addToSystemLoading);

    const search = useStoreActions((actions: Actions<IRootState>) => actions.movie.search.search);
    const addMovie = useStoreActions((actions: Actions<IRootState>) => actions.movie.addToSystem)

    const [title, setTitle] = useState<string>("");
    const [debouncedTitle] = useDebounce(title, 800);

    const [selectedMovies, setSelectedMovies] = useState<MovieSearch[]>([]);

    useEffect(() => {
        if (debouncedTitle !== "") {
            search(title);
        }
    }, [debouncedTitle]);

    const selectMovie = (e) => {
        e.target.checked
            ? setSelectedMovies([...selectedMovies, e.target.value])
            : setSelectedMovies(selectedMovies.filter((item) => item !== e.target.value));
    };

    const addMoviesToSystem = async () => {
        for (const item of selectedMovies) {
            const result = await addMovie(item);

            if (result instanceof Movie) {
                message.success(`Added movie [${result.title}]`);
            }
        }

        setSelectedMovies([]);
    };

    return (
        <Layout>
            <Head>
                <title>Add Movie</title>
            </Head>
            <WithMenu
                crumbs={[{path: "/Movies", icon: <Icon type="video-camera"/>}, {path: "/Movies/Add", name: "Add"}]}>
                <Col span={24}>
                    <Row className="search-input-row">
                        <Col span={8} offset={8}>
                            <Input.Search
                                className="search-input"
                                placeholder="Enter the title of the movie"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "5em" }}>
                        {searchLoading ? (
                            <Spinner/>
                        ) : (
                            results.searchResults.map((result) => {
                                const added = results.current.find((item) => item.title === result.title) !== undefined;

                                return (
                                    <ContentCard
                                        item={result}
                                        info={
                                            <>
                                                <Row>
                                                    <Col span={8}>
                                                          <span style={{ fontSize: "12px", color: "#ff8d1c99" }}>
                                                            {result.releaseDate.year()}
                                                        </span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span style={{ fontSize: "12px", color: "#dbbc73" }}>
                                                            {result.voteAverage} / 10
                                                        </span>
                                                    </Col>
                                                </Row>
                                                <Checkbox
                                                    style={{ color: "#fff", marginTop: ".4em" }}
                                                    defaultChecked={added}
                                                    disabled={added}
                                                    value={result}
                                                    onChange={selectMovie}
                                                >
                                                    {added ? "Aleady added" : "Add" }
                                                </Checkbox>
                                            </>
                                        }
                                        plexMessage=""
                                    />
                                )
                            })
                        )}
                    </Row>
                    <Row>
                        <FooterBar
                            buttons={[
                                (
                                    <Button
                                        disabled={selectedMovies.length <= 0}
                                        loading={addLoading}
                                        onClick={() => addMoviesToSystem()}
                                    >
                                        [{selectedMovies.length}]
                                        Add selected movies
                                    </Button>
                                )
                            ]}
                        />
                    </Row>
                </Col>
                <style jsx>
                    {`
                    :global(.search-input-row) {
                        z-index: 2;
                        position: fixed;
                        width: 100%;
                        margin: -5px 0 0 -20px;
                        height: 4em;
                        background: red;
                        background-color: #2b2b2ba8;
                        box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);
                    }
                    
                    :global(.search-input-row > div) {
                        margin-top: 10px;
                    }
                    
                    :global(.search-input-row .search-input input) {
                        background: #575757;
                        color: #fff;
                    }
                    
                    :global(.search-input-row .search-input i) {
                        color: #fff;
                    }
                `}
                </style>
            </WithMenu>
        </Layout>
    );
};

AddMoviePage.getInitialProps = async (context: AppContext) => {
    context.store.dispatch.main.menu.setActiveMenuKey("Movies");
};

export default withAuthentication(AddMoviePage);
