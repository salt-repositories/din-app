import { DesktopOutlined, LogoutOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons/lib";
import { Button, Row } from "antd";
import { Actions } from "easy-peasy";
import Link from "next/link";
import React from "react";
import { IRootState, useStoreActions } from "../../../Store";

export const MobileHome: React.FC = () => {
    const logout = useStoreActions((actions: Actions<IRootState>) => actions.authentication.logout);

    return (
        <>
            <Row>
                <a onClick={() => logout()} className="logout-span">
                    <LogoutOutlined/> Logout
                </a>
            </Row>
            <Row>
                <div className="mobile-option">
                    <Button>
                        <Link href="/Movies/Add">
                            <a>
                                <VideoCameraOutlined/><br/>
                                Add Movies
                            </a>
                        </Link>
                    </Button>
                </div>
                <div className="mobile-option">
                    <Button>
                        <Link href="/TvShows/Add">
                            <a>
                                <DesktopOutlined/><br/>
                                Add Tv Shows
                            </a>
                        </Link>
                    </Button>
                </div>
                <div className="mobile-option">
                    <Button>
                        <Link href="/Me">
                            <a>
                                <UserOutlined/><br/>
                                Me
                            </a>
                        </Link>
                    </Button>
                </div>
            </Row>
            <style jsx>
                {`
                    .logout-span {
                        z-index: 2;
                        position: fixed;
                        top: 10px;
                        left:10px;
                    }
                       
                    .mobile-option {
                        width: 100%;
                        height: calc(100vh/3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .mobile-option :global(.ant-btn) {
                        width: 10em;
                        height: 10em;
                        border-radius: 50%;
                        background: transparent;
                        color: #fff;
                        border-color: #ff8d1c;
                    }
                    
                    .mobile-option :global(.ant-btn i) {
                        font-size: 30px;
                        color: #ff8d1c;
                    }
            `}
            </style>
        </>
    );
};
