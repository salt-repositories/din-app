import { LeftOutlined, RightOutlined } from "@ant-design/icons/lib";
import { Button, Col, DatePicker, Divider, Row, Tag, Tooltip } from "antd";
import { Actions } from "easy-peasy";
import moment, { Moment } from "moment";
import { default as React, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Movie } from "../../../Domain/Models/Movies";
import { Episode } from "../../../Domain/Models/TvShow";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { MovieModal, TvShowModal } from "../../Shared/Modals";

export const DownloadCalendar: React.FC = (): JSX.Element => {
    const movieCalendarItems = useStoreState((state: IRootState) => state.movie.calendar.items);
    const tvShowCalendarItems = useStoreState((state: IRootState) => state.tvShow.calendar.items);

    const getMovieCalendarItems = useStoreActions((actions: Actions<IRootState>) => actions.movie.calendar.getItems);
    const getTvShowCalendarItems = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.calendar.getItems);

    const [dateRange, setDateRange] = useState<[Moment,Moment]>([
        moment(),
        moment().add(23, "days"),
    ]);

    const [movieModalVisible, setMovieModalVisible] = useState<[boolean, Movie]>([false, undefined]);
    const [tvShowModalVisible, setTvShowModalVisible] = useState<[boolean, object]>([false, undefined]);

    useEffect(() => {
        getMovieCalendarItems({ from: dateRange[0], till: dateRange[1] });
        getTvShowCalendarItems({ from: dateRange[0], till: dateRange[1] });
    }, [dateRange]);

    const getData = (): [Moment, (Movie | Episode)[]][] => {
        const data = [];

        let currentDate = dateRange[0];

        while (currentDate <= dateRange[1] && data.length <= 23) {
            data.push([
                currentDate.clone(),
                [
                    ...movieCalendarItems.filter((movie) => movie.physicalRelease.format("DD-MM-YYYY") === currentDate.format("DD-MM-YYYY")),
                    ...tvShowCalendarItems.filter((tvShow) => tvShow.airDate.format("DD-MM-YYYY") === currentDate.format("DD-MM-YYYY"))
                ]
            ]);
            currentDate = moment(currentDate).add(1, "day");
        }

        return data;
    };

    const datePickerOnChange = (dates): void => {
        setDateRange(dates);
    };

    const previous = (): void => {
        setDateRange([
            dateRange[0].subtract(23, "days"),
            dateRange[1].subtract(23, "days"),
        ]);
    };

    const next = (): void => {
        setDateRange([
            dateRange[0].add(23, "days"),
            dateRange[1].add(23, "days"),
        ]);
    };

    const today = (): void => {
        setDateRange([
            moment(),
            moment().add(23, "days"),
        ]);
    };

    const openItemModal = (item: Movie | Episode): void => {
        item instanceof Movie
            ? setMovieModalVisible([true, item])
            : setTvShowModalVisible([true, item]);
    };

    return (
        <>
            <MovieModal
                visible={movieModalVisible[0]}
                setVisible={setMovieModalVisible}
                movie={movieModalVisible[1]}
            />
            <TvShowModal
                visible={tvShowModalVisible[0]}
                setVisible={setTvShowModalVisible}
                episode={tvShowModalVisible[1] as Episode}
            />
            <div className="content-calendar-container">
                <Row>
                    <h1>Download Calendar</h1>
                </Row>
                <Col span={24}>
                    <Row>
                        <Col span={6}>
                            <DatePicker.RangePicker
                                className="date-picker"
                                value={dateRange}
                                onChange={datePickerOnChange}
                                format="DD-MM-YYYY"
                                allowClear={false}
                            />
                        </Col>
                        <Col span={2} offset={1}>
                            <Button.Group>
                                <Tooltip title="previous">
                                    <Button onClick={previous}>
                                        <LeftOutlined/>
                                    </Button>
                                </Tooltip>
                                <Tooltip title="next">
                                    <Button onClick={next}>
                                        <RightOutlined/>
                                    </Button>
                                </Tooltip>
                            </Button.Group>
                        </Col>
                        <Col span={1} offset={1}>
                            <Button onClick={today}>
                                Today
                            </Button>
                        </Col>
                        <Col span={3} offset={10}>
                            <span className="month">{dateRange[0].format("MMMM")}</span>
                        </Col>
                    </Row>
                    <Divider className="divider"/>
                    <Row>
                        {getData().map((item: [Moment, (Movie | Episode)[]]) => (
                            <Col span={3} className="date-card" key={item[0].unix()}>
                                <span className={item[0].format("DD-MM-YYYY") === moment().format("DD-MM-YYYY") && "today"}>
                                    {item[0].date()}
                                </span>
                                <Divider className="divider"/>
                                <Scrollbars
                                    universal={true}
                                    autoHeight={true}
                                    className="content"
                                >
                                    <div className="item-container">
                                        {item[1].map((content) => (
                                            <Row key={content.id}>
                                                <Tag
                                                    className="item"
                                                    color={
                                                        content instanceof Movie
                                                            ? content.downloaded ? "green" : "red"
                                                            : content.hasFile ? "green" : "red"
                                                    }
                                                    onClick={() => openItemModal(content)}
                                                >
                                                    {content instanceof Movie
                                                        ? `${content.title} - (${content.year})`
                                                        : `${content.tvShow.title} - (S${content.seasonNumber}E${content.episodeNumber}) - ${content.title}`
                                                    }
                                                </Tag>
                                            </Row>
                                        ))}
                                    </div>
                                </Scrollbars>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </div>

            <style jsx>
                {`
                    .content-calendar-container {
                        height: 350px;
                        min-width: 65em;
                    }
                    
                    .content-calendar-container h1 {
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    .content-calendar-container :global(.date-picker) {
                        width: 100%;
                        height: 100%;
                        background: #00000024;
                        border-color: #0000005e;
                    }
                    
                    .content-calendar-container :global(.date-picker .ant-picker-input input) {
                        color: #ff8d1c99;
                    }
                    
                    .content-calendar-container :global(.date-picker .ant-picker-suffix) {
                        color: #ff8d1c99;
                    }
                    
                    :global(.content-calendar-container .ant-btn) {
                        background: #00000024;
                        border-color: #0000005e;
                        color: #ff8d1c99;
                    }
                    
                    :global(.content-calendar-container .ant-btn-group .ant-btn) {
                        width: 50%;
                    }
                    
                    :global(.content-calendar-container .month) {
                        color: #ff8d1c99;
                        font-size: 20px;
                    }
                    
                    :global(.content-calendar-container > .ant-col > .divider) {
                        border-color: #ff8d1c;
                    }
                    
                    :global(.content-calendar-container .date-card-row) {
                        position: unset;
                    }
                    
                    :global(.content-calendar-container .date-card .content) {
                        max-width: 90%;
                    }
                    
                    :global(.content-calendar-container .date-card > span) {
                        color: #fff;
                        padding: 5px;
                    }
                    
                    :global(.content-calendar-container .date-card > .divider) {
                        min-width: 90%;
                        width: 90%;
                        margin-top: 10px;
                        border-color: #ffffff6b;
                    }
                    
                    :global(.content-calendar-container .date-card .item-container) {
                        max-height: 5em;
                    }
                    
                    :global(.content-calendar-container .date-card .item-container .skeleton-loading .ant-skeleton-paragraph li) {
                        background: linear-gradient(90deg, #6f6d6917 25%, #ff8d1c99 37%, #6f6d6917 63%);
                        background-size: 400% 100%;
                    }
                    
                    :global(.content-calendar-container .date-card .item-container .item:hover) {
                        cursor: pointer;
                    }

                    :global(.content-calendar-container .date-card .today) {
                        background: #ff8d1c;
                        border-radius: 3px;
                    }
                `}
            </style>
        </>
    );
};
