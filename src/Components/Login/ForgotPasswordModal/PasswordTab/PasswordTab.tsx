import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, FormikActions } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ApiClientProvider } from "../../../../Client";
import { ApiException } from "../../../../Client/Exceptions/ApiException";
import { ButtonSpinner } from "../../../Shared/ButtonSpinner";
import { TabStates } from "../ForgotPasswordModal";
import { IPasswordSchema, passwordSchema } from "./Schema";

interface IProps {
    email: string;
    loading: boolean;
    handleClose(): void;
    setLoading(value: boolean): void;
    setTabState(value: TabStates): void;
}
const apiClient = ApiClientProvider.getClient();

export const PasswordTab = (props: IProps): JSX.Element => {
    const sendAuthorizationCode = async (values: IPasswordSchema, formikActions: FormikActions<any>) => {
        try {
            props.setLoading(true);

            await apiClient.v1.authentication.changeAccountPassword(
                props.email,
                values.password,
                values.authorizationCode,
            );
        } catch (error) {
            if (error instanceof ApiException) {
                error.errorObject.message.includes("password")
                    ? formikActions.setFieldError("password",  error.errorObject.message)
                    : formikActions.setFieldError("authorizationCode",  error.errorObject.message);
            }

            return;
        } finally {
            props.setLoading(false);
        }

        props.setTabState("final");
    };

    return (
        <Formik
            validationSchema={passwordSchema}
            onSubmit={sendAuthorizationCode}
            initialValues={{
                password: "",
                repeatPassword: "",
                authorizationCode: "",
            }}
        >
            {({handleSubmit, handleChange, handleBlur, values, errors, touched}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="input-wrapper">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Type your new password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={!errors.password && !!touched.password}
                                isInvalid={!!errors.password && !!touched.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                            <FontAwesomeIcon icon={["fas", "key"]} className="icon"/>
                        </Form.Group>
                        <Form.Group className="input-wrapper">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                name="repeatPassword"
                                type="password"
                                placeholder="Type your new password"
                                value={values.repeatPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={!errors.repeatPassword && !!touched.repeatPassword}
                                isInvalid={!!errors.repeatPassword && !!touched.repeatPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.repeatPassword}
                            </Form.Control.Feedback>
                            <FontAwesomeIcon icon={["fas", "key"]} className="icon"/>
                        </Form.Group>
                        <Form.Group className="input-wrapper">
                            <Form.Label>Authorization code</Form.Label>
                            <Form.Control
                                name="authorizationCode"
                                type="text"
                                placeholder="Type your authorization code"
                                value={values.authorizationCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={!errors.authorizationCode && !!touched.authorizationCode}
                                isInvalid={!!errors.authorizationCode && !!touched.authorizationCode}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.authorizationCode}
                            </Form.Control.Feedback>
                            <FontAwesomeIcon icon={["fas", "fingerprint"]} className="icon"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                        <Button
                            type="submit"
                            className="sent-button"
                        >
                            <ButtonSpinner loading={props.loading}/>
                            Change password
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    );
};
