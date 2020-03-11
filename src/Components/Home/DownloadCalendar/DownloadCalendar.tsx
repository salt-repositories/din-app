import { Button, Col, DatePicker, Divider, Icon, Row, Tag, Tooltip } from "antd";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import { Actions } from "easy-peasy";
import moment, { Moment } from "moment";
import { default as React, useEffect, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { Movie } from "../../../Domain/Models/Movies";
import { TvShowCalendar } from "../../../Domain/Models/TvShow";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { CalendarItemModal } from "./CalendarItemModal";

const rowIndexes = [7, 15, 23];

export const DownloadCalendar: React.FC = (): JSX.Element => {
    const movieCalendarItems = useStoreState((state: IRootState) => state.movie.calendar.items);
    const tvShowCalendarItems = useStoreState((state: IRootState) => state.tvShow.calendar.items);

    const getMovieCalendarItems = useStoreActions((actions: Actions<IRootState>) => actions.movie.calendar.getItems);
    const getTvShowCalendarItems = useStoreActions((actions: Actions<IRootState>) => actions.tvShow.calendar.getItems);

    const [dateRange, setDateRange] = useState<{ from: Moment, till: Moment }>({
        from: moment(),
        till: moment().add(36, "days"),
    });
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Movie | TvShowCalendar>();

    useEffect(() => {
        getMovieCalendarItems(dateRange);
        getTvShowCalendarItems(dateRange);
    }, [dateRange]);

    const getData = (): [Moment, (Movie | TvShowCalendar)[]][] => {
        const data = [];

        let currentDate = dateRange.from;

        while (currentDate <= dateRange.till && data.length <= 23) {
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

    const datePickerOnChange = (dates: RangePickerValue): void => {
        setDateRange({from: dates[0], till: dates[1]});
    };

    const previous = (): void => {
        setDateRange({
            from: dateRange.from.subtract(36, "days"),
            till: dateRange.till.subtract(36, "days"),
        })
    };

    const next = (): void => {
        setDateRange({
            from: dateRange.from.add(36, "days"),
            till: dateRange.till.add(36, "days"),
        })
    };

    const today = (): void => {
        setDateRange({
            from: moment(),
            till: moment().add(36, "days"),
        });
    };

    const openItemModal = (item: Movie | TvShowCalendar): void => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    return (
        <>
            <CalendarItemModal
                visible={modalVisible}
                setVisible={setModalVisible}
                item={selectedItem}
            />
            <div className="content-calendar-container">
                <Row>
                    <h1>Download Calendar</h1>
                </Row>
                <Col span={24}>
                    <Row>
                        <Col span={6}>
                            <DatePicker.RangePicker
                                defaultValue={[dateRange.from, dateRange.till]}
                                onChange={datePickerOnChange}
                                format="DD-MM-YYYY"
                                allowClear={false}
                            />
                        </Col>
                        <Col span={2} offset={1}>
                            <Button.Group>
                                <Tooltip title="previous week">
                                    <Button onClick={previous}>
                                        <Icon type="left"/>
                                    </Button>
                                </Tooltip>
                                <Tooltip title="next week">
                                    <Button onClick={next}>
                                        <Icon type="right"/>
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
                            <span className="month">{dateRange.from.format("MMMM")}</span>
                        </Col>
                    </Row>
                    <Divider className="divider"/>
                    <Row>
                        <Col span={24}>
                            {getData().map((item: [Moment, (Movie | TvShowCalendar)[]], index: number) => (
                                <div className={rowIndexes.includes(index) && "ant-row date-card-row"} key={item[0].unix()}>
                                    <Col span={3} className="date-card">
                                    <span
                                        className={
                                            item[0].format("DD-MM-YYYY") === moment().format("DD-MM-YYYY") && "today"}
                                    >
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
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Col>
            </div>

            <style jsx>
                {`
                    .content-calendar-container {
                        height: 350px;
                        min-width: 70em;
                    }
                    
                    .content-calendar-container h1 {
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }
                    
                    :global(.content-calendar-container .ant-calendar-picker-input) {
                        background: #00000024;
                        border-color: #0000005e;
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
                        background: #ff8d1c;
                    }
                    
                    :global(.content-calendar-container .date-card-row) {
                        position: unset;
                    }
                    
                    :global(.content-calendar-container .date-card > span) {
                        color: #fff;
                        padding: 5px;
                    }
                    
                    :global(.content-calendar-container .date-card > .divider) {
                        min-width: 90%;
                        width: 90%;
                        margin-top: 10px;
                    }
                    
                    :global(.content-calendar-container .date-card .item-container) {
                        max-height: 5em;
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
