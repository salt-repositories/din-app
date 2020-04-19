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
import { TvShow, TvShowSearch } from "../../src/Domain/Models/TvShow";
import { WithMenu } from "../../src/Layouts";
import Layout from "../../src/Layouts/Layout";
import { IRootState, useStoreActions, useStoreState } from "../../src/Store";
import { AppContext } from "../../src/Store/AppContext";

const AddTvShowPage: NextPage = () => {
    const results = useStoreState((state: IRootState) => state.tvShow.search.results);
    const searchLoading = useStoreState((state: IRootState) => state.tvShow.search.loading);
    const addLoading = useStoreState((state: IRootState) => state.tvShow.addToSystemLoading);

    const search = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.search.search);
    const addTvShow = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.addToSystem);

    const [title, setTitle] = useState<string>("");
    const [debouncedTitle] = useDebounce(title, 800);

    const [selectedTvShows, setSelectedTvShows] = useState<TvShowSearch[]>([]);

    useEffect(() => {
        if (debouncedTitle !== "") {
            search(title);
        }
    }, [debouncedTitle]);

    const selectTvShow = (e) => {
        e.target.checked
            ? setSelectedTvShows([...selectedTvShows, e.target.value])
            : setSelectedTvShows(selectedTvShows.filter((item) => item !== e.target.value));
    };

    const addTvShowToSystem = async () => {
        for (const item of selectedTvShows) {
            const result = await addTvShow(item);

            if (result instanceof TvShow) {
                message.success(`Added TvShow [${result.title}]`);
            }
        }

        setSelectedTvShows([]);
    };

    return (
        <Layout>
            <Head>
                <title>Add TvShow</title>
            </Head>
            <WithMenu
                crumbs={[{path: "/TvShows", icon: <Icon type="desktop"/>}, {path: "/TvShows/Add", name: "Add"}]}>
                <Col span={24}>
                    <Row className="search-input-row">
                        <Col span={8} offset={7}>
                            <Input.Search
                                className="search-input"
                                placeholder="Enter the title of the tv show"
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
                                        key={result.tmdbId}
                                        item={result}
                                        info={
                                            <>
                                                <Row>
                                                    <Col span={8}>
                                                          <span style={{ fontSize: "12px", color: "#ff8d1c99" }}>
                                                            {result.firstAirDate.year()}
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
                                                    onChange={selectTvShow}
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
                                        key="add-tvshows"
                                        disabled={selectedTvShows.length <= 0}
                                        loading={addLoading}
                                        onClick={() => addTvShowToSystem()}
                                    >
                                        [{selectedTvShows.length}]
                                        Add selected tv shows
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

AddTvShowPage.getInitialProps = async (context: AppContext) => {
    context.store.dispatch.main.menu.setActiveMenuKey("TvShows");
};

export default withAuthentication(AddTvShowPage);
