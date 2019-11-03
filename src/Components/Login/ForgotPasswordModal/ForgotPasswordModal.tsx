import { Button, Modal, Tabs } from "antd";
import { Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import { ComponentsActions } from "../../../Store/Components/actions";
import { IInitialState } from "../../../Store/states";
import EmailTab from "./EmailTab/EmailTab";
import { forgotPasswordSchema, initialValues } from "./Formik";
import PasswordTab from "./PasswordTab/PasswordTab";

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

export type TabStates = "email" | "password" | "final";

const ForgotPasswordModal = (props: Props) => {
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
            <Formik
                validationSchema={forgotPasswordSchema}
                initialValues={initialValues}
                onSubmit={undefined}
            >
                {() => (
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
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            key="1"
                        >
                            <PasswordTab
                                loading={props.loading}
                                handleClose={handleClose}
                                setLoading={props.setLoading}
                                setTabIndex={props.setTabIndex}
                            />
                        </Tabs.TabPane>
                        {/*<Tab eventKey="password" title="Authorize">*/}
                        {/*    <PasswordTab*/}
                        {/*        email={email}*/}
                        {/*        loading={loading}*/}
                        {/*        handleClose={handleClose}*/}
                        {/*        setLoading={setLoading}*/}
                        {/*        setTabState={setTabState}*/}
                        {/*    />*/}
                        {/*</Tab>*/}
                        {/*<Tab eventKey="final" title="Final">*/}
                        {/*    <FinalTab handleClose={handleClose}/>*/}
                        {/*</Tab>*/}
                    </Tabs>
                )}
            </Formik>
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
