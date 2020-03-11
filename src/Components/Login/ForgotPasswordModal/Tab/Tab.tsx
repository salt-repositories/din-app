import { Button } from "antd";
import React, { ReactNode } from "react";

interface IProps {
    loading?: boolean;
    final?: boolean;
    submitText?: string;
    children: ReactNode;
    closeCallback(): void;
}

export const Tab = (props: IProps): JSX.Element => {
    return (
        <div className="tab-content">
            {props.children}
            <div className="button-group">
                {props.final
                    ? (
                        <Button key="back" type="primary" onClick={props.closeCallback}>
                            Close
                        </Button>
                    ) : (
                        <>
                            <Button key="back" onClick={props.closeCallback}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-button"
                                loading={props.loading}
                            >
                                {props.submitText}
                            </Button>
                        </>
                    )}
            </div>
            <style jsx>
                {`
                    .tab-content {
                        padding: 0 20px 0 20px;
                    }
                    
                    :global(.tab-content > h2) {
                        color: #ff8d1c;
                    }
                    
                    .button-group {
                        text-align: right;
                    }
                    
                    :global(.button-group > .submit-button) {
                       margin-left: 10px;
                    }
                `}
            </style>
        </div>
    );
};
