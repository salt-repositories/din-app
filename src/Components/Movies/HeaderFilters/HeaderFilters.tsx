import { Col, Select } from "antd";
import { Button, Form, Row } from "antd";
import { Actions } from "easy-peasy";
import React, { useEffect } from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { Poster } from "../../Home/RecentlyAdded/Poster";

export const HeaderFilters = () => {
    const movies = useStoreState((state: IRootState) => state.movie.movies.items);

    const {
        sortBy,
        sortDirection,
    } = useStoreState((state: IRootState) => ({
        sortBy: state.movie.movies.params.sortBy,
        sortDirection: state.movie.movies.params.sortDirection,
    }));

    const setParamProp = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.setParamProp);
    const setFilterProp = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.setFilterProp);

    const getMovies = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.get);
    const next = useStoreActions((actions: Actions<IRootState>) => actions.movie.movies.next);

    useEffect(() => {
        getMovies();
    }, [sortBy, sortDirection]);

    const paramsOnChange = (prop: string, value: string) => {
        setParamProp([prop, value]);
    };

    return (
        <>
            <div>
                <Form
                    layout="inline"
                >
                    <Form.Item label="By">
                        <Select defaultValue="title" onChange={(value: string) => paramsOnChange("sortBy", value)}>
                            <Select.Option value="title">Title</Select.Option>
                            <Select.Option value="year">Year</Select.Option>
                            <Select.Option value="added">Date added</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Select defaultValue="Asc" onChange={(value: string) => paramsOnChange("sortDirection", value)}>
                            <Select.Option value="Asc">Ascending</Select.Option>
                            <Select.Option value="Desc">Descending</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
