import { Icon } from "antd";
import { Actions } from "easy-peasy";
import { Formik, FormikHelpers } from "formik";
import { Form, Input } from "formik-antd";
import React from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../../Store";
import { Tab } from "../Tab";
import { emailSchema, IEmailSchema, initialValues } from "./Schema";

interface IProps {
    handleClose(): void;
    setTabIndex(index: number): void;
    setEmail(email: string): void;
}


export const EmailTab = (props: IProps): JSX.Element => {
    const getAuthorizationCode = useStoreActions((actions: Actions<IRootState>) => actions.authentication.getAuthorizationCode);
    const loading = useStoreState((state: IRootState) => state.authentication.getAuthorizationCodeLoading);

    const sendForgotPasswordEmail = async (values: IEmailSchema, actions: FormikHelpers<IEmailSchema>) => {
        await getAuthorizationCode(values.email);
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
                            loading={loading}
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
