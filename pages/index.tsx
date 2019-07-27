import "reflect-metadata";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faFingerprint, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useState } from "react";
import { Badge, Button, Col, Container, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import ApiClient from "../Client/ApiClient";
import FullScreenCarousel from "../components/FullScreenCarousel";
import ToggleSwitch from "../components/ToggleSwitch";
import Layout from "../Layouts/Layout";

library.add(faUser, faKey, faEnvelope, faFingerprint);

const apiClient: ApiClient = new ApiClient();

export const Index: NextPage = (props: any): JSX.Element => {
    const state = new Map();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        console.log(state.get("forgot-email"));
        setKey("first");
        setShow(false);
    };

    const handleShow = () => {
        console.log(state.get("forgot-email"));
        setShow(true);
    };

    const [key, setKey] = useState("first");

    const sendForgotPasswordEmail = (password: string) => {

        setKey("second");
    };

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <FullScreenCarousel images={props.backgrounds} />
            <Container>
                <Row className="spacer" />
                <Row>
                    <Col md={{ span: 6, offset: 3 }} className="login-col">
                        <Form className="login-form">
                            <div className="title-wrapper">
                                <Badge variant="light" className="title">DIN</Badge>
                            </div>
                            <Form.Group className="input-wrapper">
                                <Form.Label>Username / Email</Form.Label>
                                <Form.Control type="text" placeholder="Type your username or email"></Form.Control>
                                <FontAwesomeIcon icon={["fas", "user"]} className="icon" />
                            </Form.Group>
                            <Form.Group className="input-wrapper">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Type your password"></Form.Control>
                                <FontAwesomeIcon icon={["fas", "key"]} className="icon" />
                            </Form.Group>
                            <div className="text-right link-wrapper">
                                <span onClick={handleShow}>Forgot Password?</span>
                            </div>
                            <Form.Group className="box-wrapper">
                                <ToggleSwitch text="Remember username / email"/>
                            </Form.Group>
                            <Form.Group className="button-wrapper">
                                <Button type="submit">LOGIN</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    className="password-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot password</Modal.Title>
                    </Modal.Header>
                    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k: string) => setKey(k)} hidden="true">
                        <Tab eventKey="first" title="first">
                            <Modal.Body>
                                <p>To request a new password, an authorization code will be
                                    sent to your account registered email.
                                </p>
                                <Form.Group className="input-wrapper">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Type your email"
                                        value={state.get("forgot-email")}
                                        onChange={(event: any) => console.log(event)}
                                    />
                                    <FontAwesomeIcon icon={["fas", "envelope"]} className="icon" />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Button
                                    className="sent-button"
                                    onClick={() => sendForgotPasswordEmail("asd")}
                                >Send email</Button>
                            </Modal.Footer>
                        </Tab>
                        <Tab eventKey="second" title="second">
                            <Modal.Body>
                                <Form.Group className="input-wrapper">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Type your new password"></Form.Control>
                                    <FontAwesomeIcon icon={["fas", "key"]} className="icon" />
                                </Form.Group>
                                <Form.Group className="input-wrapper">
                                    <Form.Label>Repeat Password</Form.Label>
                                    <Form.Control type="password" placeholder="Type your new password"></Form.Control>
                                    <FontAwesomeIcon icon={["fas", "key"]} className="icon" />
                                </Form.Group>
                                <Form.Group className="input-wrapper">
                                    <Form.Label>Authorization code</Form.Label>
                                    <Form.Control type="text" placeholder="Type your authorization code"></Form.Control>
                                    <FontAwesomeIcon icon={["fas", "fingerprint"]} className="icon" />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Button
                                    className="sent-button"
                                >Change password</Button>
                            </Modal.Footer>
                        </Tab>
                    </Tabs>
                </Modal>
            </Container>
            <style jsx>
                {`
                    :global(.spacer) {
                        height: 10vh;
                    }

                    :global(.login-col) {
                        border-radius: 10px;
                        height: 80vh;
                        padding: 50px 55px 50px;
                        background: white;
                        opacity: .9;
                    }

                    :global(.login-form) {
                        width: 80%;
                        height: 70vh;
                        margin-left: 10%;
                        opacity: 1;
                    }

                    :global(.title-wrapper) {
                        text-align: center;
                        margin-bottom: 10vh;
                    }

                    :global(.title) {
                        font-size: 40px;
                        color: #ff8d1c;
                        border: 1px solid;
                        line-height: 1.2;
                    }

                    :global(.input-wrapper) {
                        position: relative;
                        width: 100%;
                        border-bottom: 2px solid #d9d9d9;
                    }

                    :global(.input-wrapper label) {
                        font-size: 14px;
                        color: #3d495e;
                        line-height: 1.5;
                        padding-left: 7px;
                    }

                    :global(.input-wrapper input) {
                        font-size: 16px;
                        color: #3d495e;
                        line-height: 1.2;
                        display: block;
                        width: 100%;
                        height: 55px;
                        background: 0 0;
                        padding: 0 7px 0 43px;
                        outline: none;
                        border: none;
                        border-radius: none;
                    }

                    :global(.input-wrapper input:focus) {
                        outline:0px !important;
                        -webkit-appearance:none;
                        box-shadow: none !important;
                    }

                    :global(.input-wrapper input:focus + .icon) {
                        color: #ff8d1c;
                    }

                    :global(.link-wrapper span) {
                        font-size: 14px;
                        line-height: 1.7;
                        color: #ff8d1c;
                        margin: 0;
                        transition: all .4s;
                        -webkit-transition: all .4s;
                        -o-transition: all .4s;
                        -moz-transition: all .4s;
                    }

                    :global(.link-wrapper span:hover) {
                        cursor: pointer;
                    }

                    :global(.box-wrapper) {
                        margin-top: 5vh;
                        margin-bottom: 0 !important;
                    }

                    :global(.button-wrapper) {
                        margin-top: 5vh;
                        margin-bottom: 0 !important;
                    }

                    :global(.login-form button) {
                        font-size: 16px;
                        color: #fff;
                        background: #ff8d1c;
                        border-color: #ff8d1c;
                        line-height: 1.2;
                        text-transform: uppercase;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -moz-box;
                        display: -ms-flexbox;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 20px;
                        width: 100%;
                        height: 50px;
                        border-radius: 25px;
                    }

                    :global(.login-form button:hover) {
                        background: #d2771b;
                        border-color: #ff8d1c;
                    }

                    :global(.icon) {
                        color: #d9d9d9;
                        position: absolute;
                        top: 60%;
                        display: block;
                    }

                    :global(.password-modal .modal-content) {
                        padding: 50px !important;
                        border: none !important;
                    }

                    :global(.password-modal .modal-content .modal-header) {
                        color: #ff8d1c;
                    }

                    :global(.password-modal .modal-content .modal-footer) {
                        border-top: none;
                    }

                    :global(.password-modal .modal-content .sent-button) {
                        color: #fff;
                        background: #ff8d1c;
                        border-color: #ff8d1c;
                    }

                    :global(.password-modal .modal-content .sent-button:hover) {
                        background: #d2771b;
                        border-color: #ff8d1c;
                    }
                `}
            </style>
        </Layout>
    );
};

Index.getInitialProps = async (context: NextPageContext): Promise<{}> => {
    const backgrounds = await apiClient.v1.media.getBackgrounds();
    const gif = await apiClient.v1.media.getGifsByTag("funny");

    return { backgrounds, gif };
};

export default Index;
