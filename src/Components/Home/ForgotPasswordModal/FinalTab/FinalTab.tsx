import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface IProps {
    handleClose(): void;
}

export const FinalTab = (props: IProps): JSX.Element => {
    return (
        <Form>
            <Modal.Body>
                <p>
                    Your password has been changed successfully.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="sent-button"
                    onClick={props.handleClose}
                >
                        Close
                </Button>
            </Modal.Footer>
        </Form>
    );
};
