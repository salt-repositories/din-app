import { Button, Checkbox, Col, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Content, Search } from "../../../Domain/Models/Abstractions";
import { ValidationError } from "../../../Domain/Models/Exeptions";
import { MovieSearch } from "../../../Domain/Models/Movies";
import { TvShowSearch } from "../../../Domain/Models/TvShow";
import { IRootState, useStoreState } from "../../../Store";
import { ISearchResult } from "../../../Store/Shared/search";
import { ContentCard } from "../Cards/ContentCard";
import { MINIMAL_WIDTH } from "../consts";
import { FooterBar } from "../FooterBar/FooterBar";
import { Spinner } from "../Spinner";

interface IProps<TModel extends Content, TSearch extends Search> {
    searchMethod: (query: string) => void;
    searchLoading: boolean;
    addMethod: (item: Search) => Promise<TModel>;
    addLoading: boolean;
    results: ISearchResult<TModel, TSearch>;

    searchString: string;
    addString: string;
    addedString: string;
}

export const SearchContent: React.FC<IProps<any, any>> = <TModel extends Content, TSearch extends Search>(props: IProps<TModel, TSearch>) => {
    const currentWidth = useStoreState((state: IRootState) => state.main.windowWidth);

    const [title, setTitle] = useState<string>("");
    const [debouncedTitle] = useDebounce(title, 800);

    const [selectedItems, setSelectedItems] = useState<Search[]>([]);

    useEffect(() => {
        if (debouncedTitle !== "") {
            props.searchMethod(debouncedTitle);
        }
    }, [debouncedTitle]);

    const selectItem = (e) => {
        e.target.checked
            ? setSelectedItems([...selectedItems, e.target.value])
            : setSelectedItems(selectedItems.filter((item) => item !== e.target.value));
    };

    const addItemsToSystem = async () => {
        for (const item of selectedItems) {
            const result = await props.addMethod(item);

            if (result && !Array.isArray(result) && !(result as unknown as ValidationError).errorMessage) {
                message.success(`${props.addedString} [${result.title}]`);
            }
        }

        setSelectedItems([]);
    };

    return (
        <>
            <Row className="search-input-row">
                <Col span={currentWidth < MINIMAL_WIDTH ? 16 : 8} offset={currentWidth < MINIMAL_WIDTH ? 4 : 7}>
                    <Input.Search
                        className="search-input"
                        placeholder={props.searchString}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
            </Row>
            <Row className="search-result-row">
                {props.searchLoading ? (
                    <Spinner/>
                ) : (
                    props.results.searchResults.map((result, index) => {
                        const added = props.results.current.find((item) => item.title === result.title) !== undefined;
                        return (
                            <ContentCard
                                key={`${result.title}-${result.tmdbId}-${index}`}
                                message="none"
                                item={result}
                                info={
                                    <>
                                        <Row>
                                            <Col span={8}>
                                            <span style={{fontSize: "12px", color: "#ff8d1c99"}}>
                                                {result instanceof MovieSearch && result.releaseDate.year()}
                                                {result instanceof TvShowSearch && result.firstAirDate.year()}
                                            </span>
                                            </Col>
                                            <Col span={12}>
                                            <span style={{fontSize: "12px", color: "#dbbc73"}}>
                                                {result.voteAverage} / 10
                                            </span>
                                            </Col>
                                        </Row>
                                        <Checkbox
                                            style={{color: "#fff", marginTop: ".4em"}}
                                            defaultChecked={added}
                                            disabled={added}
                                            value={result}
                                            onChange={selectItem}
                                        >
                                            {added ? "Aleady added" : "Add"}
                                        </Checkbox>
                                    </>
                                }
                            />
                        );
                    })
                )}
            </Row>
            <Row>
                <FooterBar
                    buttons={[
                        (
                            <Button
                                key="add-content"
                                disabled={selectedItems.length <= 0}
                                loading={props.addLoading}
                                onClick={() => addItemsToSystem()}
                            >
                                [{selectedItems.length}]
                                {` ${props.addString}`}
                            </Button>
                        )
                    ]}
                />
            </Row>
            <style jsx>
                {`
                    :global(.search-input-row) {
                        z-index: 2;
                        position: fixed;
                        width: 100%;
                        height: 4em;
                        margin: ${currentWidth > MINIMAL_WIDTH ? "-60px 0 0 -20px" : ""};
                        background-color: #2b2b2ba8;
                        box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);
                    }
                    
                    :global(.search-input-row > div) {
                        margin-top: 10px;
                    }
                    
                    :global(.search-input-row .search-input) {
                        background: #575757;
                        border: none;
                    }
                    
                    :global(.search-input-row .search-input input) {
                        background: #575757;
                        color: #fff;
                    }
                    
                    :global(.search-input-row .search-input .ant-input-suffix span) {
                        color: #fff;
                    }
                    
                    :global(.search-input-row .search-input .ant-input-search-icon::before) {
                        border: none;
                    }
                    
                    :global(.search-input-row .search-input i) {
                        color: #fff;
                    }
                    
                    :global(.search-result-row) {
                        margin-top: 4em;
                        ${currentWidth < MINIMAL_WIDTH && "width: 80%;"}
                        ${currentWidth < MINIMAL_WIDTH && "margin-left: 10%;"}
                    }
                `}
            </style>
        </>
    );
};
