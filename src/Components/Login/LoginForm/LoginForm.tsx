import { Badge, Button, Form, Icon, Input, Switch } from "antd";
import { Formik, FormikActions } from "formik";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import React, { useState } from "react";
import { setTokenCookie } from "../../../Authentication";
import { ApiClientProvider } from "../../../Client";
import { ApiException } from "../../../Client/Exceptions/ApiException";
import { Token } from "../../../Models";
import { logEvent } from "../../../Utils/Analytics";
import { ILoginSchema, loginSchema } from "./Schema";
import { useDispatch } from "react-redux";
import { ComponentsActions } from "../../../Store/Components/actions";

interface IProps {
    username: string;
    rememberUsername: boolean;
    modalHandler(visible: true): void;
}

const apiClient = ApiClientProvider.getClient();

export const LoginForm = (props: IProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleStatus = (error, touched): any => {
        if (!error && !!touched) {
            return "success";
        } else if (error && !!touched) {
            return "error";
        }
    };

    const handleLogin = async (values: ILoginSchema, formikActions: FormikActions<any>) => {
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
            <div className="login-col">
                <Formik
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                    initialValues={{
                        username: props.rememberUsername ? props.username : "",
                        password: "",
                        rememberUsername: props.rememberUsername,
                    }}
                >
                    {({handleSubmit, handleChange, handleBlur, values, errors, touched}) => (
                        <Form noValidate onSubmit={handleSubmit} className="login-form">
                            <div className="title-wrapper">
                                <Badge className="title">DIN</Badge>
                            </div>
                            <Form.Item
                                className="input-wrapper"
                                label="Username / Email"
                                hasFeedback
                                validateStatus={handleStatus(errors.username, touched.username)}
                                help={errors.username}
                            >
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder="Type your username or email"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    prefix={<Icon className="icon" type="user"/>}
                                />
                            </Form.Item>
                            <Form.Item
                                className="input-wrapper"
                                label="Password"
                                hasFeedback
                                validateStatus={handleStatus(errors.password, touched.password)}
                                help={errors.password}
                            >
                                <Input.Password
                                    name="password"
                                    placeholder="Type your password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    prefix={<Icon type="key"/>}

                                />
                            </Form.Item>
                            <div className="text-right link-wrapper">
                                    <span onClick={() => dispatch(ComponentsActions.setShowForgotPasswordModal(true))}>
                                        Forgot Password?
                                    </span>
                            </div>
                            <Form.Item
                                className="box-wrapper"
                                label="Remember username / email"
                            >
                                <Switch
                                    onChange={handleChange}
                                    defaultChecked={values.rememberUsername}
                                />
                            </Form.Item>
                            <Form.Item className="button-wrapper">
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
            <style jsx>
                {`
                    :global(.login-col) {
                        border-radius: 10px;
                        padding: 50px 55px 50px;
                        background: white;
                        opacity: .9;
                        margin: 10vh auto;
                        display: block;
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
                        margin-top: 2vh;
                        margin-bottom: 0 !important;
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
                        left: 5px !important;
                    }

                    :global(.form-control.is-invalid ~ .invalid-feedback) {
                        position: absolute;
                    }
                `}
            </style>
        </>
    );
};

export default LoginForm;
