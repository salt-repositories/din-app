import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faFingerprint, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { EmailTab } from "./EmailTab";
import { FinalTab } from "./FinalTab";
import { PasswordTab } from "./PasswordTab";

library.add(faUser, faKey, faEnvelope, faFingerprint);

interface IProps {
    visible: boolean;
    modalHandler(visible: boolean): void;
}

export type TabStates = "email" | "password" | "final";

export const ForgotPasswordModal = (props: IProps) => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [tabState, setTabState] = useState<TabStates>("email");

    const handleClose = () => {
        props.modalHandler(false);
        setTabState("email");
    };

    return (
        <Modal
            show={props.visible}
            onHide={handleClose}
            centered
            className="password-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Forgot password</Modal.Title>
            </Modal.Header>
            <Tabs id="tabs" activeKey={tabState} onSelect={(state: TabStates) => setTabState(state)} hidden="true">
                <Tab eventKey="email" title="Email">
                    <EmailTab
                        setEmail={setEmail}
                        loading={loading}
                        handleClose={handleClose}
                        setLoading={setLoading}
                        setTabState={setTabState}
                    />
                </Tab>
                <Tab eventKey="password" title="Authorize">
                    <PasswordTab
                        email={email}
                        loading={loading}
                        handleClose={handleClose}
                        setLoading={setLoading}
                        setTabState={setTabState}
                    />
                </Tab>
                <Tab eventKey="final" title="Final">
                    <FinalTab handleClose={handleClose}/>
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
