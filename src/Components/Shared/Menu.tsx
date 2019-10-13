import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilm, faHome, faTv, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import React, { SyntheticEvent } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MainActions } from "../../Store/Main/actions";
import { selectedMenuItemSelector } from "../../Store/Main/selectors";

library.add(faHome, faFilm, faTv, faUserCircle);

export const Menu = (): JSX.Element => {
    const dispatch = useDispatch();
    const selectedMenuItem = useSelector(selectedMenuItemSelector);

    const handleChange = async (eventKey: string, event?: SyntheticEvent): Promise<void> => {
        event.preventDefault();
        dispatch(MainActions.setActiveMenuItem(eventKey));
        await Router.push(eventKey);
    };

    return (
        <React.Fragment>
            <div className="side-menu">
                <div className="logo-section">
                    <span>DIN</span>
                </div>
                <div className="navigation-section">
                    <Nav
                        activeKey={selectedMenuItem}
                        onSelect={handleChange}
                    >
                        <Nav.Item className="nav-item">
                            <Nav.Link href="/Home" className="link">
                                <FontAwesomeIcon icon={["fas", "home"]} size="sm" className="logo"/>
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="nav-item">
                            <Nav.Link href="/Me" className="link">
                                <FontAwesomeIcon icon={["fas", "user-circle"]} size="sm" className="logo"/>
                                Me
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="nav-item">
                            <Nav.Link href="/Movies" className="link">
                                <FontAwesomeIcon icon={["fas", "film"]} size="sm" className="logo"/>
                                Movies
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="nav-item">
                            <Nav.Link href="/Tvshows" className="link">
                                <FontAwesomeIcon icon={["fas", "tv"]} size="sm" className="logo"/>
                                Tv Shows
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
            <style jsx>
                {`
                    .side-menu {
                        position: fixed;
                        height: 100vh;
                        min-height: 100vh;
                        width: 100px;
                        min-width: 100px;
                        left: 0;
                        background: #2b2b2ba8;
                    }
                    
                    .side-menu .logo-section span {
                        color: #ff8d1c;
                        text-align: center;
                        font-size: 35px;
                        display: block;
                        margin: 10px auto;
                    }
                    
                    :global(.nav-item) {
                        display: block;
                        position: relative;
                        width: 100%;
                        box-sizing: border-box;
                        font-size: 12px;
                        color: #bcc1c5;
                        text-decoration: none;
                        fill: #f1f2f3;
                    }
                    
                    :global(.nav-item .logo) {
                        display: block;
                        margin: 0 auto 5px;
                        width: 32px;
                        height: 32px;
                    }
                    
                    :global(.nav-item .link) {
                        color: #bcc1c5;
                        display: block;
                        text-align: center;
                        padding: 16px 0px;
                    }
                    
                    :global(.nav-item .link:hover) {
                        color: #ff8d1c;
                    }
                    
                    :global(.nav-item .active) {
                        color: #ff8d1c;
                        background: rgba(25,26,26,.5);
                    }
                `}
            </style>
        </React.Fragment>
    );
};
