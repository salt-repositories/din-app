import { Icon, Menu } from "antd";
import { Actions } from "easy-peasy";
import Link from "next/link";
import React from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";

export const SideMenu = (): JSX.Element => {
    const activeMenuKey = useStoreState((state: IRootState) => state.main.menu.activeMenuKey);
    const logout = useStoreActions((actions: Actions<IRootState>) => actions.authentication.logout);

    return (
        <>
            <Menu
                className="side-menu"
                defaultSelectedKeys={[activeMenuKey]}
                mode="inline"
            >
                <Menu.Item key="Home" className="menu-item">
                    <Link href="/Home">
                        <a>
                            <Icon type="home" className="icon"/>
                            Home
                        </a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="Me" className="menu-item">
                    <Link href="/Me">
                        <a>
                            <Icon type="user" className="icon"/>
                            Me
                        </a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="Movies" className="menu-item">
                    <Link href="/Movies">
                        <a>
                            <Icon type="video-camera" className="icon"/>
                            Movies
                        </a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="TvShows" className="menu-item">
                    <Link href="/TvShows">
                        <a>
                            <Icon type="desktop" className="icon"/>
                            Tv Shows
                        </a>
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="Logout"
                    className="menu-item logout"
                    onClick={() => logout()}
                >
                    <span>
                        <Icon type="logout" className="icon"/>
                        Logout
                    </span>
                </Menu.Item>
            </Menu>
            <style jsx>
                {`
                    :global(.side-menu) {
                        position: fixed;
                        top: 0;
                        height: 100vh;
                        width: 100px;
                        background: #2b2b2ba8;
                        border: none;
                    }
                    
                    :global(.side-menu .menu-item) {
                        font-size: 12px;
                        text-decoration: none;
                        fill: #f1f2f3;
                        background: none !important;
                        height: 5em;
                        text-align: center;
                    }
                    
                    :global(.side-menu .ant-menu-item) {
                        padding-left: 10px !important;
                    }
                    
                    :global(.side-menu .ant-menu-item a) {
                        color: #f1f2f3;
                    }
                    
                    
                    :global(.side-menu .ant-menu-item a:hover) {
                        color: #ee9e4f;
                    }
                    
                    :global(.side-menu .ant-menu-item-selected a) {
                        color: #ff8d1c;
                    }
                    
                    :global(.side-menu .logout) {
                        color: #c62b2b;
                        position: absolute;
                        bottom: 0;
                    }
                    
                    :global(.side-menu .logout:hover) {
                        color: #d75050;
                    }
                    
                    :global(.side-menu .menu-item .icon) {
                        display: block;
                        font-size: 25px;
                        margin: 5px auto -5px auto;
                    }
                `}
            </style>
        </>
    );
};
