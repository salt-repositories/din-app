import { FormikActions } from "formik";
import { connect as formikConnect } from "formik";
import React from "react";
import { ApiClientProvider } from "../../../../Client";
import { ApiException } from "../../../../Client/Exceptions/ApiException";
import { IFormikProps } from "../Formik";
import { Button, Form, Icon, Input } from "antd";

interface IProps {
    loading: boolean;
    handleClose(): void;
    setLoading(value: boolean): void;
    setTabIndex(value: number): void;
}

type Props = IProps &
    IFormikProps;

const apiClient = ApiClientProvider.getClient();

const PasswordTab = (props: Props): JSX.Element => {
    const changeAccountPassword = async () => {
        try {
            props.setLoading(true);

            await apiClient.v1.authentication.changeAccountPassword(
                props.formik.values.email,
                props.formik.values.firstPassword,
                props.formik.values.authorizationCode,
            );
        } catch (error) {
            if (error instanceof ApiException) {
                error.errorObject.message.includes("password")
                    ? props.formik.setFieldError("password", error.errorObject.message)
                    : props.formik.setFieldError("authorizationCode", error.errorObject.message);
            }

            return;
        } finally {
            props.setLoading(false);
        }

        props.setTabIndex(2);
    };

    return (
        <>
            <h2>Choose your new password</h2>
            <Form.Item
                className="input-wrapper"
                label="Password"
                hasFeedback
                validateStatus="success"
                help={props.formik.errors.firstPassword}
            >
                <Input.Password
                    name="firstPassword"
                    placeholder="Type your new password"
                    value={props.formik.values.firstPassword}
                    onChange={props.formik.handleChange}
                    onBlur={props.formik.handleBlur}
                    prefix={<Icon type="key"/>}
                />
            </Form.Item>
            <Form.Item
                className="input-wrapper"
                label="Password"
                hasFeedback
                validateStatus="success"
                help={props.formik.errors.secondPassword}
            >
                <Input.Password
                    name="secondPassword"
                    placeholder="Repeat your new password"
                    value={props.formik.values.secondPassword}
                    onChange={props.formik.handleChange}
                    onBlur={props.formik.handleBlur}
                    prefix={<Icon type="key"/>}
                />
            </Form.Item>
            <Form.Item
                className="input-wrapper"
                label="Authorization code"
                hasFeedback
                validateStatus="success"
                help={props.formik.errors.authorizationCode}
            >
                <Input
                    name="authorizationCode"
                    placeholder="Type your authorization code"
                    value={props.formik.values.authorizationCode}
                    onChange={props.formik.handleChange}
                    onBlur={props.formik.handleBlur}
                    prefix={<Icon type="finger"/>}
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
                    onClick={changeAccountPassword}
                >
                    Send Email
                </Button>
            </div>
        </>
    );
};

export default formikConnect<Props>(PasswordTab) as React.FC<IProps>;


{/*<Modal.Body>*/}
{/*    <Form.Group className="input-wrapper">*/}
{/*        <Form.Label>New Password</Form.Label>*/}
{/*        <Form.Control*/}
{/*            name="password"*/}
{/*            type="password"*/}
{/*            placeholder="Type your new password"*/}
{/*            value={values.password}*/}
{/*            onChange={handleChange}*/}
{/*            onBlur={handleBlur}*/}
{/*            isValid={!errors.password && !!touched.password}*/}
{/*            isInvalid={!!errors.password && !!touched.password}*/}
{/*        />*/}
{/*        <Form.Control.Feedback type="invalid">*/}
{/*            {errors.password}*/}
{/*        </Form.Control.Feedback>*/}
{/*        <FontAwesomeIcon icon={["fas", "key"]} className="icon"/>*/}
{/*    </Form.Group>*/}
{/*    <Form.Group className="input-wrapper">*/}
{/*        <Form.Label>Repeat Password</Form.Label>*/}
{/*        <Form.Control*/}
{/*            name="repeatPassword"*/}
{/*            type="password"*/}
{/*            placeholder="Type your new password"*/}
{/*            value={values.repeatPassword}*/}
{/*            onChange={handleChange}*/}
{/*            onBlur={handleBlur}*/}
{/*            isValid={!errors.repeatPassword && !!touched.repeatPassword}*/}
{/*            isInvalid={!!errors.repeatPassword && !!touched.repeatPassword}*/}
{/*        />*/}
{/*        <Form.Control.Feedback type="invalid">*/}
{/*            {errors.repeatPassword}*/}
{/*        </Form.Control.Feedback>*/}
{/*        <FontAwesomeIcon icon={["fas", "key"]} className="icon"/>*/}
{/*    </Form.Group>*/}
{/*    <Form.Group className="input-wrapper">*/}
{/*        <Form.Label>Authorization code</Form.Label>*/}
{/*        <Form.Control*/}
{/*            name="authorizationCode"*/}
{/*            type="text"*/}
{/*            placeholder="Type your authorization code"*/}
{/*            value={values.authorizationCode}*/}
{/*            onChange={handleChange}*/}
{/*            onBlur={handleBlur}*/}
{/*            isValid={!errors.authorizationCode && !!touched.authorizationCode}*/}
{/*            isInvalid={!!errors.authorizationCode && !!touched.authorizationCode}*/}
{/*        />*/}
{/*        <Form.Control.Feedback type="invalid">*/}
{/*            {errors.authorizationCode}*/}
{/*        </Form.Control.Feedback>*/}
{/*        <FontAwesomeIcon icon={["fas", "fingerprint"]} className="icon"/>*/}
{/*    </Form.Group>*/}
{/*</Modal.Body>*/}
{/*<Modal.Footer>*/}
{/*<Button variant="secondary" onClick={props.handleClose}>Close</Button>*/}
{/*    <Button*/}
{/*type="submit"*/}
{/*className="sent-button"*/}
{/*    >*/}
{/*    <ButtonSpinner loading={props.loading}/>*/}
{/*Change password*/}
{/*</Button>*/}
{/*</Modal.Footer>*/}
