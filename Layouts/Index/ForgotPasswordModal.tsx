import Spinner from "@Components/Spinner";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faFingerprint, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";

library.add(faUser, faKey, faEnvelope, faFingerprint);

export const ForgotPasswordModal = (props) => {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [authorizationCode, setAuthorizationCode] = useState("");

    const handleClose = () => {
        props.setKey("first");
        props.setShow(false);
    };
    
    const sendForgotPasswordEmail = (event) => {
        setLoading(true);

        const form = event.currentTarget;

        if (form.checkValidity() !== false) {
            // TODO: send api request to get authorization code
            props.setKey("second");
        }
        event.preventDefault();
        event.stopPropagation();

        setEmailValid(true);
    };

    const changePassword = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() !== false) {
            // TODO: send api request to change password
            props.setKey("last");
        }
    };
    
    return (
        <Modal
            show={props.show}
            onHide={handleClose}
            centered
            className="password-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Forgot password</Modal.Title>
            </Modal.Header>
            <Tabs id="tabs" activeKey={props.keyElement} onSelect={(k: string) => props.setKey(k)} hidden="true">
                <Tab eventKey="first" title="first">
                    <Form noValidate validated={emailValid} onSubmit={sendForgotPasswordEmail}>
                        <Modal.Body>
                            <p>To request a new password, an authorization code will be
                                sent to your account registered email.
                            </p>
                            <Form.Group className="input-wrapper">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Type your email"
                                    value={email}
                                    onChange={(event: any) => setEmail(event.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email
                                </Form.Control.Feedback>
                                <FontAwesomeIcon icon={["fas", "envelope"]} className="icon" />
                            </Form.Group>
                            {loading ? <Spinner /> : <></>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button
                                type="submit"
                                className="sent-button"
                            >Send email</Button>
                        </Modal.Footer>
                    </Form>
                </Tab>
                <Tab eventKey="second" title="second">
                    <Modal.Body>
                        <Form.Group className="input-wrapper">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Type your new password"/>
                            <FontAwesomeIcon icon={["fas", "key"]} className="icon" />
                        </Form.Group>
                        <Form.Group className="input-wrapper">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type="password" placeholder="Type your new password"/>
                            <FontAwesomeIcon icon={["fas", "key"]} className="icon" />
                        </Form.Group>
                        <Form.Group className="input-wrapper">
                            <Form.Label>Authorization code</Form.Label>
                            <Form.Control type="text" placeholder="Type your authorization code"/>
                            <FontAwesomeIcon icon={["fas", "fingerprint"]} className="icon" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button
                            className="sent-button"
                        >Change password</Button>
                    </Modal.Footer>
                </Tab>
            </Tabs>
            <style jsx>
                {`
                    :global(.password-modal .modal-content) {
                        padding: 50px !important;
                        border: none !important;
                    }

                    :global(.password-modal .modal-content .modal-header) {
                        color: #ff8d1c;
                    }

                    :global(.password-modal .modal-content .modal-footer) {
                        border-top: none;
                    }

                    :global(.password-modal .modal-content .sent-button) {
                        color: #fff;
                        background: #ff8d1c;
                        border-color: #ff8d1c;
                    }

                    :global(.password-modal .modal-content .sent-button:hover) {
                        background: #d2771b;
                        border-color: #ff8d1c;
                    }

                    :global(.invalid-feedback) {
                        position: absolute;
                    }
                `}
            </style>
        </Modal>
    );
};

export default ForgotPasswordModal;
