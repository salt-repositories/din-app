import { Button, Icon, Row } from "antd";
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
                    <Icon type="logout"/> Logout
                </a>
            </Row>
            <Row>
                <div className="mobile-option">
                    <Button>
                        <Link href="/Movies/Add">
                            <a>
                                <Icon type="video-camera"/><br/>
                                Add Movies
                            </a>
                        </Link>
                    </Button>
                </div>
                <div className="mobile-option">
                    <Button>
                        <Link href="/TvShows/Add">
                            <a>
                                <Icon type="desktop"/><br/>
                                Add Tv Shows
                            </a>
                        </Link>
                    </Button>
                </div>
                <div className="mobile-option">
                    <Button>
                        <Link href="/Me">
                            <a>
                                <Icon type="user"/><br/>
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
                        background: #575757;
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
