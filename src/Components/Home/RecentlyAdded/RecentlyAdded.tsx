import { Row, Select } from "antd";
import { useState } from "react";
import * as React from "react";
import { MoviesContainer } from "./MoviesContainer";
import { TvShowsContainer } from "./TvShowsContainer";

export const RecentlyAdded = (): JSX.Element => {
    const [select, setSelect] = useState<string>("movies");

    return (
        <div
            className="recently-added"
        >
            <Row>
                <h1 className="card-title">Recently Added</h1>
                <Select
                    defaultValue={select}
                    className="select"
                    onChange={setSelect}
                >
                    <Select.Option value="movies">Movies</Select.Option>
                    <Select.Option value="tvshows">Tv Shows</Select.Option>
                </Select>
            </Row>
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
                        margin-top: 4em;
                        height: 100%;
                    }
                  
                    :global(.recently-added .card-title) {
                        margin-left: 10px;
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
                        width: 100%;
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
                `}
            </style>
        </div>
    );
};
