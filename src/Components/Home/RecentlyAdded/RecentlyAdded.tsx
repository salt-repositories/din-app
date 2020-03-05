import { Card, Row, Select } from "antd";
import { useState } from "react";
import * as React from "react";
import { MoviesContainer } from "./MoviesContainer";
import { TvShowsContainer } from "./TvShowsContainer";

export const RecentlyAdded = (): JSX.Element => {
    const [select, setSelect] = useState<string>("movies");

    return (
        <Card
            className="recently-added"
        >

            <h1 className="card-title">Recently Added</h1>
            <Select
                defaultValue={select}
                className="select"
                onChange={setSelect}
            >
                <Select.Option value="movies">Movies</Select.Option>
                <Select.Option value="tvshows">Tv Shows</Select.Option>
            </Select>
            <div className="horizontal-container">
                <Row className="row">
                    {select === "movies" ? (
                        <MoviesContainer/>
                    ) : (
                        <TvShowsContainer/>
                    )}
                </Row>
            </div>
            <style jsx>
                {`
                    :global(.recently-added) {
                        position: fixed;
                        bottom: 2em;
                        right: 2em;
                        border-radius: 5px;
                        border: none;
                        width: 90vw;
                        height: 400px;
                        background: #2b2b2ba8;
                        margin: auto auto auto 8vw;
                    }
                  
                    :global(.recently-added .card-title) {
                        margin-left: 2.2em;
                        float: left;
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    :global(.recently-added .select) {
                        float: left;
                        margin-top: 0.15em;
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    :global(.recently-added .select .ant-select-selection:focus, .ant-select-selection:active) {
                        box-shadow: none;
                    }
                    
                    :global(.recently-added .select .ant-select-selection) {
                        background: transparent;
                        border: transparent;
                    }
                     
                    :global(.recently-added .select .ant-select-arrow) {
                       color: #ff8d1c;
                       right: 5px;
                    }
                    
                    :global(.horizontal-container) {
                        margin: 0 auto;
                        width: 95%;
                        height: 100%;
                        overflow-x: scroll;
                        overflow-y: hidden;
                        white-space: nowrap;
                        scrollbar-width: none;z
                    }
                    
                    :global(.horizontal-container > .row) {
                        flex-wrap: nowrap;
                        height: 100%;
                        margin-left: 0;
                        margin-right: 0;
                    }
                    
                    .horizontal-container::-webkit-scrollbar {
                        display: none;
                    }
                    
                    :global(.horizontal-container > .row > .container-item) {
                        background: transparent;
                        min-width: 130px;
                        margin: 10px;
                        border: none;
                        overflow: hidden;
                    }
                    
                    :global(.container-item) {
                        width: 130px;
                        display: inline-block;
                    }
                    
                    :global(.container-item .card-img) {
                        height: 185px;
                    }
                    
                    :global(.container-item .plex:hover) {
                        cursor: pointer
                    }
                    
                    :global(.container-item > .ant-card-body) {
                        padding: 24px 0 24px 0;
                    }
                    
                    :global(.container-item > .ant-card-body .ant-card-meta-title) {
                        height: 28px;
                        color: #fff;
                        overflow-wrap: break-word;
                        word-wrap: break-word;
                        hyphens: auto;
                        font-size: 12px;
                        margin-bottom: 0;
                    }
                    
                    :global(.container-item > .ant-card-body .ant-card-meta-description) {
                        color: #9d7751;
                        margin-bottom: 7px;
                    }
                    
                    :global(.container-item .trailer-link) {
                        color: #dbd6ce;
                        font-size: 12px;
                        margin-right: 10px;
                    }
                    
                    :global(.container-item .trailer-link:hover) {
                        cursor: pointer
                    }
                    
                    :global(.container-item .trailer-link .logo) {
                        width: 20px;
                        color: #df1818;
                        margin-right: 5px;
                    }
                    
                    :global(.container-item .plex-link) {
                        color: #dbd6ce;
                        font-size: 12px;
                    }
                    
                    :global(.container-item .plex-link:hover) {
                        cursor: pointer
                    }
                    
                    :global(.container-item .plex-link .logo) {
                        width: 13px;
                        height: 13px;
                        color: #df1818;
                        margin-right: 5px;
                    }
                    
                    :global(.container-item .imdb-link) {
                        color: #dbd6ce;
                        font-size: 12px;
                    }
                    
                    :global(.container-item .imdb-link:hover) {
                        cursor: pointer
                    }
                    
                    :global(.container-item .imdb-link .logo) {
                        width: 20px;
                        height: 12px;
                        color: #df1818;
                        margin-right: 5px;
                    }
                `}
            </style>
        </Card>
    );
};
