import ToggleSwitch from "../../src/Components/ToggleSwitch";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faFingerprint, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";

library.add(faUser, faKey, faEnvelope, faFingerprint);

export const LoginForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
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
                            <Form.Control type="text" placeholder="Type your username or email"/>
                            <FontAwesomeIcon icon={["fas", "user"]} className="icon" />
                        </Form.Group>
                        <Form.Group className="input-wrapper">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Type your password"/>
                            <FontAwesomeIcon icon={["fas", "key"]} className="icon" />
                        </Form.Group>
                        <div className="text-right link-wrapper">
                            <span onClick={props.handleShow}>Forgot Password?</span>
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
                `}
            </style>
        </Container>
    );
};

export default LoginForm;
