import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, FormikActions } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ApiClientProvider } from "../../../../Client";
import { ApiException } from "../../../../Client/Exceptions/ApiException";
import { ButtonSpinner } from "../../../Shared/ButtonSpinner";
import { TabStates } from "../ForgotPasswordModal";
import { emailSchema, IEmailSchema } from "./Schema";

interface IProps {
    loading: boolean;
    setEmail(email: string): void;
    handleClose(): void;
    setLoading(value: boolean): void;
    setTabState(value: TabStates): void;
}

const apiClient = ApiClientProvider.getClient();

export const EmailTab = (props: IProps): JSX.Element => {
    const sendForgotPasswordEmail = async (values: IEmailSchema, formikActions: FormikActions<any>) => {
        try {
            props.setLoading(true);
            await apiClient.v1.authentication.getAuthorizationCode(values.email);
            props.setEmail(values.email);
        } catch (error) {
            if (error instanceof ApiException) {
                formikActions.setFieldError("email", error.errorObject.message);
            }

            return;
        } finally {
            props.setLoading(false);
        }

        props.setTabState("password");
    };
    return (
        <Formik
            validationSchema={emailSchema}
            onSubmit={sendForgotPasswordEmail}
            initialValues={{
                email: "",
            }}
        >
            {({handleSubmit, handleChange, handleBlur, values, errors, touched}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Body>
                        <p>To request a new password, an authorization code will be
                            sent to your account registered email.
                        </p>
                        <Form.Group className="input-wrapper">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Type your email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={!errors.email && !!touched.email}
                                isInvalid={!!errors.email && !!touched.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                            <FontAwesomeIcon icon={["fas", "envelope"]} className="icon"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                        <Button
                            type="submit"
                            className="sent-button"
                        >
                            <ButtonSpinner loading={props.loading}/>
                            Send email
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    );
};
