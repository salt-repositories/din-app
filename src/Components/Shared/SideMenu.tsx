import { Icon, Menu  } from "antd";
import { SelectParam } from "antd/es/menu";
import { Actions } from "easy-peasy";
import Router from "next/router";
import { destroyCookie } from "nookies";
import React from "react";
import { IRootState, useStoreActions, useStoreState } from "../../Store";

export const SideMenu = (): JSX.Element => {
    const activeMenuKey = useStoreState((state: IRootState) => state.main.menu.activeMenuKey);
    const setActiveMenuKey = useStoreActions((actions: Actions<IRootState>) => actions.main.menu.setActiveMenuKey);

    const onSelect = (param: SelectParam) => {
        if (param.key === "Logout") {
            return logout();
        }

        setActiveMenuKey(param.key);
        Router.push(`/${param.key}`);
    };

    const logout = () => {
        destroyCookie({}, "token");
        Router.push("/");
    };

    return (
        <>
            <Menu
                className="side-menu"
                defaultSelectedKeys={[activeMenuKey]}
                mode="inline"
                onSelect={onSelect}
            >
                <Menu.Item key="Home" className="menu-item">
                    <span>
                        <Icon type="home" className="icon"/>
                        Home
                    </span>
                </Menu.Item>
                <Menu.Item key="Me" className="menu-item">
                    <span>
                        <Icon type="user" className="icon"/>
                        Me
                    </span>
                </Menu.Item>
                <Menu.Item key="Movies" className="menu-item">
                    <span>
                        <Icon type="video-camera" className="icon"/>
                        Movies
                    </span>
                </Menu.Item>
                <Menu.Item key="TvShows" className="menu-item">
                    <span>
                        <Icon type="desktop" className="icon"/>
                        Tv Shows
                    </span>
                </Menu.Item>
                <Menu.Item key="Logout" className="menu-item logout">
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
                        color: #f1f2f3;
                        padding-left: 10px !important;
                    }
                    
                    :global(.side-menu .ant-menu-item-selected) {
                        color: #ff8d1c;
                    }
                    
                    :global(.side-menu .logout) {
                        color: #c62b2b;
                        position: absolute;
                        bottom: 0;
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
