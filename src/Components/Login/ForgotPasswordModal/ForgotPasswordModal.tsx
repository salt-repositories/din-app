import { Modal, Tabs } from "antd";
import React, { useState } from "react";
import { IRootState, useStoreActions, useStoreState } from "../../../Store";
import { EmailTab } from "./EmailTab";
import { FinalTab } from "./FinalTab";
import { PasswordTab } from "./PasswordTab";

export const ForgotPasswordModal = () => {
    const [email, setEmail] = useState<string>("");

    const visible = useStoreState((state: IRootState) => state.components.forgotPassword.visible);
    const currentTab = useStoreState((state: IRootState) => state.components.forgotPassword.currentTab);
    const loading = useStoreState((state: IRootState) => state.components.forgotPassword.loading);

    const setVisible = useStoreActions((actions) => actions.components.forgotPassword.setVisible);
    const setCurrentTab = useStoreActions((actions) => actions.components.forgotPassword.setCurrentTab);
    const setLoading = useStoreActions((actions) => actions.components.forgotPassword.setLoading);

    const handleClose = () => {
        setVisible(false);
        setCurrentTab(0);
    };

    return (
        <Modal
            visible={visible}
            onCancel={handleClose}
            centered
            className="password-modal"
            title="Forgot password"
            footer={null}
        >
            <Tabs
                defaultActiveKey={currentTab.toString()}
                activeKey={currentTab.toString()}
                renderTabBar={() => <></>}
            >
                <Tabs.TabPane
                    key="0"
                >
                    <EmailTab
                        loading={loading}
                        handleClose={handleClose}
                        setLoading={setLoading}
                        setTabIndex={setCurrentTab}
                        setEmail={setEmail}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane
                    key="1"
                >
                    <PasswordTab
                        email={email}
                        loading={loading}
                        handleClose={handleClose}
                        setLoading={setLoading}
                        setTabIndex={setCurrentTab}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane key="2">
                    <FinalTab handleClose={handleClose}/>
                </Tabs.TabPane>
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
