import { DesktopOutlined, VideoCameraOutlined } from "@ant-design/icons/lib";
import { Avatar, Card, Col, Descriptions, Row, Skeleton, Statistic } from "antd";
import { Actions } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";

export const UserInfo: React.FC = (): JSX.Element => {
    const me = useStoreState((state: IRootState) => state.me.me);

    const getMe = useStoreActions((actions: Actions<IRootState>) => actions.me.getMe);
    const getAddedContent = useStoreActions((actions: Actions<IRootState>) => actions.me.getAddedContent);

    const getMeLoading = useStoreState((state: IRootState) => state.me.getMeLoading);

    const [amountLoading, setAmountLoading] = useState<boolean>(false);
    const [amountOfMovies, setAmountOfMovies] = useState<number>(0);
    const [amountOfTvShows, setAmountOfTvShows] = useState<number>(0);

    useEffect(() => {
        if (!me) {
            getMe();
        }

        const getAmounts = async () => {
            setAmountLoading(true);
            setAmountOfMovies(
                (await getAddedContent({
                    filters: {
                        type: "Movie"
                    }
                })).totalCount
            );
            setAmountOfTvShows(
                (await getAddedContent({
                    filters: {
                        type: "TvShow"
                    }
                })).totalCount
            );
            setAmountLoading(false);
        };

        getAmounts();
    }, []);

    return (
        <>
            <div className="user-info-container">
                {getMeLoading ? (
                    <Skeleton
                        active
                        avatar={{
                            size: 220
                        }}
                        loading={getMeLoading}
                        paragraph={{ rows: 4 }}
                    />
                ) : me && (
                    <Row>
                        <Col span={3}>
                            <Avatar size={220} icon="user" />
                        </Col>
                        <Col span={10} offset={1}>
                            <Descriptions title="User Info" column={2}>
                                <Descriptions.Item label="UserName">{me.username}</Descriptions.Item>
                                <Descriptions.Item label="Email">{me.email}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={2}>
                            <Card loading={amountLoading}>
                                <Statistic
                                    title="Movies Added"
                                    value={amountOfMovies}
                                    precision={0}
                                    valueStyle={{ color: "#ff8d1c99" }}
                                    prefix={<VideoCameraOutlined/>}
                                />
                            </Card>
                        </Col>
                        <Col span={2} offset={1}>
                            <Card loading={amountLoading}>
                                <Statistic
                                    title="Tv Shows Added"
                                    value={amountOfTvShows}
                                    precision={0}
                                    valueStyle={{ color: "#ff8d1c99" }}
                                    prefix={<DesktopOutlined/>}
                                />
                            </Card>
                        </Col>
                    </Row>
                )}
            </div>
            <style jsx>
                {`
                    .user-info-container {
                        margin: 2em 0 5em 2em;
                    }
                    
                    .user-info-container :global(.ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-title, .ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-paragraph > li) {
                        background: linear-gradient(90deg, #2b2b2ba8 25%, #484848a8 37%, #2b2b2ba8 63%);
                        animation: ant-skeleton-loading 1.4s ease infinite;
                    }
                    
                    .user-info-container :global(.ant-descriptions, .ant-card) {
                        margin-top: 3em;
                    }
                    
                    .user-info-container :global(.ant-card) {
                        max-height: 110px;
                        background: #2b2b2ba8;
                        border: none;
                    }
                    
                    .user-info-container :global(.ant-card .ant-statistic-title) {
                        font-size: 13px;
                        color: #fff;
                    }
                    
                    .user-info-container :global(.ant-descriptions .ant-descriptions-title) {
                        font-size: 25px;
                        color: #ff8d1c;
                        text-shadow: 1px 1px 1px #000;
                    }

                    .user-info-container :global(.ant-descriptions .ant-descriptions-item-label) {
                        color: #ff8d1c99;
                    }
                    
                    .user-info-container :global(.ant-descriptions .ant-descriptions-item-content) {
                        color: #fff;
                    }
                    
                    .user-info-container :global(.content-chart text) {
                        font-size: 4px;
                        fill: #fff;
                    }
                `}
            </style>
        </>
    );
};
