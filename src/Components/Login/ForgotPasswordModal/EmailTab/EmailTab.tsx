import { Icon } from "antd";
import { Formik, FormikHelpers } from "formik";
import { Form, Input } from "formik-antd";
import React from "react";
import { ApiClientProvider } from "../../../../Domain/Client";
import { ApiException } from "../../../../Domain/Client/Exceptions/ApiException";
import { Tab } from "../Tab";
import { emailSchema, IEmailSchema, initialValues } from "./Schema";

interface IProps {
    loading: boolean;
    handleClose(): void;
    setLoading(value: boolean): void;
    setTabIndex(index: number): void;
    setEmail(email: string): void;
}

const apiClient = ApiClientProvider.getClient();

export const EmailTab = (props: IProps): JSX.Element => {
    const sendForgotPasswordEmail = async (values: IEmailSchema, actions: FormikHelpers<IEmailSchema>) => {
        props.setLoading(true);

        try {
            await apiClient.v1.authentication.getAuthorizationCode(values.email);
        } catch (error) {
            if (error instanceof ApiException) {
                actions.setFieldError("email", error.errorObject.message);
            }

            return;
        } finally {
            props.setLoading(false);
        }

        props.setEmail(values.email);
        props.setTabIndex(1);
    };

    return (
        <>
            <Formik
                validationSchema={emailSchema}
                onSubmit={sendForgotPasswordEmail}
                initialValues={initialValues}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Tab
                            loading={props.loading}
                            submitText="Send email"
                            closeCallback={props.handleClose}
                        >
                            <h2>Verify your email</h2>
                            <p>To request a new password, an authorization code will be
                                sent to your account registered email.
                            </p>
                            <Form.Item
                                name="email"
                                className="input-wrapper"
                                label="Email"
                            >
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Type your email"
                                    prefix={<Icon type="mail" theme="twoTone" twoToneColor="#ff8d1c"/>}
                                />
                            </Form.Item>
                        </Tab>
                    </Form>
                )}
            </Formik>
        </>
    );
};
