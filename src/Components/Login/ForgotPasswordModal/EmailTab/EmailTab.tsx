import { Button, Form, Icon, Input } from "antd";
import { connect as formikConnect } from "formik";
import React from "react";
import { ApiClientProvider } from "../../../../Client";
import { ApiException } from "../../../../Client/Exceptions/ApiException";
import { IFormikProps } from "../Formik";

interface IProps {
    loading: boolean;
    handleClose(): void;
    setLoading(value: boolean): void;
    setTabIndex(index: number): void;
}

type Props = IProps &
    IFormikProps;

const apiClient = ApiClientProvider.getClient();

const EmailTab = (props: Props): JSX.Element => {
    const sendForgotPasswordEmail = async () => {
        // props.setLoading(true);
        //
        // try {
        //     await apiClient.v1.authentication.getAuthorizationCode(props.formik.values.email);
        // } catch (error) {
        //     if (error instanceof ApiException) {
        //         props.formik.setFieldError("email", error.errorObject.message);
        //     }
        //
        //     return;
        //     return;
        // } finally {
        //     props.setLoading(false);
        // }

        props.setTabIndex(1);
    };

    return (
        <>
            <h2>Verify your email</h2>
            <p>To request a new password, an authorization code will be
                sent to your account registered email.
            </p>
            <Form.Item
                className="input-wrapper"
                label="Email"
                hasFeedback
                validateStatus="success"
                help={props.formik.errors.email}
            >
                <Input
                    name="email"
                    type="email"
                    placeholder="Type your email"
                    value={props.formik.values.email}
                    onChange={props.formik.handleChange}
                    onBlur={props.formik.handleBlur}
                    prefix={<Icon type="mail" theme="twoTone" twoToneColor="#ff8d1c"/>}
                />
            </Form.Item>
            <div className="button-group">
                <Button key="back" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button
                    className="send-email"
                    key="submit"
                    type="primary"
                    loading={props.loading}
                    onClick={sendForgotPasswordEmail}
                >
                    Send Email
                </Button>
            </div>
            <style jsx>
                {`
                    .button-group {
                        text-align: right;
                    }
                    
                    :global(.button-group > .send-email) {
                       margin-left: 10px;
                    }
                `}
            </style>
        </>
    );
};

export default formikConnect<Props>(EmailTab) as React.FC<IProps>;

