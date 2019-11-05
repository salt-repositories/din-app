import { Modal, Tabs } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { ComponentsActions } from "../../../Store/Components/actions";
import { IInitialState } from "../../../Store/states";
import { EmailTab } from "./EmailTab";
import { FinalTab } from "./FinalTab";
import { PasswordTab } from "./PasswordTab";

const mapStateToProps = (state: IInitialState) => ({
    loading: state.components.forgotPassword.loading,
    visible: state.components.forgotPassword.visible,
    currentTab: state.components.forgotPassword.currentTab,
});

const mapDispatchToProps = ({
    setLoading: ComponentsActions.ForgotPassword.setLoading,
    setVisible: ComponentsActions.setShowForgotPasswordModal,
    setTabIndex: ComponentsActions.setForgotPasswordModalTabIndex,
});

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps;

const ForgotPasswordModal = (props: Props) => {
    const [email, setEmail] = useState<string>("");

    const handleClose = () => {
        props.setVisible(false);
        props.setTabIndex(0);
    };

    return (
        <Modal
            visible={props.visible}
            onCancel={handleClose}
            centered
            className="password-modal"
            title="Forgot password"
            footer={null}
        >
            <Tabs
                defaultActiveKey={props.currentTab.toString()}
                activeKey={props.currentTab.toString()}
                renderTabBar={() => <></>}
            >
                <Tabs.TabPane
                    key="0"
                >
                    <EmailTab
                        loading={props.loading}
                        handleClose={handleClose}
                        setLoading={props.setLoading}
                        setTabIndex={props.setTabIndex}
                        setEmail={setEmail}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane
                    key="1"
                >
                    <PasswordTab
                        email={email}
                        loading={props.loading}
                        handleClose={handleClose}
                        setLoading={props.setLoading}
                        setTabIndex={props.setTabIndex}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForgotPasswordModal) as React.FC;
