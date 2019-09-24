import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faFingerprint, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, FormikActions } from "formik";
import React, { useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { ApiClientProvider } from "../../../Client";
import { ApiException } from "../../../Client/Exceptions/ApiException";
import { ButtonSpinner } from "../../Shared/ButtonSpinner";
import ToggleSwitch from "../../Shared/ToggleSwitch";
import { ILoginSchema, loginSchema } from "./Schema";

library.add(faUser, faKey, faEnvelope, faFingerprint);

interface IProps {
    remember: boolean;
    modalHandler(visible: true): void;
}

const apiClient = ApiClientProvider.getClient();

export const LoginForm = (props: IProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (values: ILoginSchema, formikActions: FormikActions<any>) => {
        let response = null;

        try {
            setLoading(true);

            response = await apiClient.v1.authentication.getTokenByCredentials(values.username, values.password);
        } catch (error) {
            if (error instanceof ApiException) {
                console.log(JSON.stringify(error));
            }

            return;
        } finally {
            setLoading(false);
        }

        console.log(response);
    };

    return (
        <Container>
            <Row className="spacer"/>
            <Row>
                <Col md={{span: 6, offset: 3}} className="login-col">
                    <Formik
                        validationSchema={loginSchema}
                        onSubmit={handleLogin}
                        initialValues={{
                            username: "",
                            password: "",
                        }}
                    >
                        {({handleSubmit, handleChange, values, errors, touched}) => (
                            <Form noValidate onSubmit={handleSubmit} className="login-form">
                                <div className="title-wrapper">
                                    <Badge variant="light" className="title">DIN</Badge>
                                </div>
                                <Form.Group className="input-wrapper">
                                    <Form.Label>Username / Email</Form.Label>
                                    <Form.Control
                                        name="username"
                                        type="text"
                                        placeholder="Type your username or email"
                                        value={values.username}
                                        onChange={handleChange}
                                        isInvalid={!!errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                    <FontAwesomeIcon icon={["fas", "user"]} size="lg" className="icon"/>
                                </Form.Group>
                                <Form.Group className="input-wrapper">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Type your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                    <FontAwesomeIcon icon={["fas", "key"]} className="icon"/>
                                </Form.Group>
                                <div className="text-right link-wrapper">
                                    <span onClick={() => props.modalHandler(true)}>Forgot Password?</span>
                                </div>
                                <Form.Group className="box-wrapper">
                                    <ToggleSwitch
                                        text="Remember username / email"
                                        value={props.remember}
                                    />
                                </Form.Group>
                                <Form.Group className="button-wrapper">
                                    <Button type="submit">
                                        <ButtonSpinner loading={loading}/>
                                        LOGIN
                                    </Button>
                                </Form.Group>
                            </Form>
                        )}
                    </Formik>
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
                        margin-bottom: 2rem;
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
                        width: 15px;
                        color: #d9d9d9;
                        position: absolute;
                        top: 60%;
                        display: block;
                    }
                    
                    :global(.form-control.is-invalid ~ .invalid-feedback) {
                        position: absolute;
                    }
                `}
            </style>
        </Container>
    );
};

export default LoginForm;
