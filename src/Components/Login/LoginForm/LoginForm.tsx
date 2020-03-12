import { Badge, Button, Icon, Switch } from "antd";
import { Formik , FormikHelpers } from "formik";
import { Form, Input } from "formik-antd";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import React, { useState } from "react";
import { setTokenCookie } from "../../../Domain/Authentication";
import { ApiClientProvider } from "../../../Domain/Client";
import { ApiException } from "../../../Domain/Client/Exceptions/ApiException";
import { Token } from "../../../Domain/Models";
import { logEvent } from "../../../Domain/Utils";
import { useStoreActions } from "../../../Store";
import { ILoginSchema, loginSchema } from "./Schema";

interface IProps {
    username: string;
}

const apiClient = ApiClientProvider.getClient();

export const LoginForm = (props: IProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const showForgotPasswordModal = useStoreActions((action) => action.components.forgotPassword.setVisible);

    const handleLogin = async (values: ILoginSchema, formikActions: FormikHelpers<any>) => {
        setLoading(true);

        let response: Token = new Token();

        try {
            response = await apiClient.v1.authentication.getTokenByCredentials(values.username, values.password);
        } catch (error) {
            if (error instanceof ApiException) {
                formikActions.setFieldError("password", error.errorObject.message);
            }

            return;
        } finally {
            setLoading(false);
        }

        values.rememberUsername
            ? setCookie({}, "username", values.username, {})
            : destroyCookie({}, "username");

        setTokenCookie(response);
        logEvent("Authentication", "login");

        await Router.push("/Home");

        setLoading(false);
    };

    return (
        <>
            <div className="login-wrapper">
                <div className="login-col">
                <Formik
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                    initialValues={{
                        username: props.username ? props.username : "",
                        password: "",
                        rememberUsername: !!props.username,
                    }}
                >
                    {({ handleSubmit, handleChange, values, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit} className="login-form">
                            <div className="title-wrapper">
                                <Badge className="title">DIN</Badge>
                            </div>
                            <Form.Item
                                name="username"
                                className="input-wrapper"
                                label="Username / Email"
                            >
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder="Type your username or email"
                                    prefix={<Icon className="icon" type="user"/>}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                className="input-wrapper"
                                label="Password"
                            >
                                <Input.Password
                                    name="password"
                                    placeholder="Type your password"
                                    prefix={<Icon type="key"/>}

                                />
                            </Form.Item>
                            <div className="text-right link-wrapper">
                                    <span onClick={() => showForgotPasswordModal(true)}>
                                        Forgot Password?
                                    </span>
                            </div>
                            <div
                                className="box-wrapper"
                            >
                                <span>Remember username / email</span>
                                <br/>
                                <Switch
                                    onChange={(value) => setFieldValue("rememberUsername", value)}
                                    defaultChecked={values.rememberUsername}
                                />
                            </div>
                            <Form.Item className="button-wrapper" name="submit">
                                <Button
                                    htmlType="submit"
                                    className="submit"
                                    loading={loading}
                                >
                                    LOGIN
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </div>
            </div>
            <style jsx>
                {`
                    .login-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100vh;
                    }
                    
                    :global(.login-col) {
                        border-radius: 10px;
                        padding: 50px 55px 50px;
                        background: white;
                        opacity: .9;
                        width: 500px;
                    }

                    :global(.login-form) {
                        width: 80%;
                        margin-left: 10%;
                        opacity: 1;
                    }

                    :global(.title-wrapper) {
                        text-align: center;
                        margin-bottom: 5vh;
                    }

                    :global(.title) {
                        font-size: 40px;
                        color: #ff8d1c;
                        border: 1px solid;
                        line-height: 1.2;
                        padding: 10px;
                        border-radius: 10px;
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
                        outline: 0px !important;
                        -webkit-appearance: none;
                        box-shadow: none !important;
                    }

                    :global(.ant-input-prefix > .icon:focus-withintf) {
                        color: #ff8d1c;
                    }
                    
                    :global(.link-wrapper) {
                        text-align: right;
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
                        margin-top: 2vh;
                        margin-bottom: 0 !important;
                    }
                    
                    :global(.box-wrapper .ant-switch-checked) {
                        background-color: #ff8d1c;
                    }

                    :global(.button-wrapper) {
                        margin: 2em 0 2em 0;
                    }

                    :global(.login-form .submit) {
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

                    :global(.login-form .submit:hover) {
                        background: #d2771b;
                        border-color: #ff8d1c;
                    }

                    :global(.ant-input-prefix) {
                        left: 0px !important;
                    }
                    
                    :global(.ant-input-suffix) {
                        position: absolute;
                        top: 1.5em;
                        left: 21em;
                    }
                    
                    :global(.ant-form-explain) {
                        color: #c62b2b;
                        list-style-type: none;
                    }
                `}
            </style>
        </>
    );
};
