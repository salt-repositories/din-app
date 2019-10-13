import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import { ComponentsActions } from "../../Store/Components/actions";
import { showYoutubeModalSelector } from "../../Store/Components/selectors";

interface IProps {
    show: boolean;
    trailerId: string;
}

export const YoutubeModal = (props: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const show = useSelector(showYoutubeModalSelector);

    console.log(show);
    return (
        <React.Fragment>
            <Modal
                show={props.show}
                onHide={() => dispatch(ComponentsActions.setShowYoutubeModal(false))}
                centered
                className="youtube-modal"
            >
                <YouTube
                    videoId={props.trailerId}
                    opts={{
                        height: "780",
                        width: "1280",
                        playerVars: {
                            autoplay: 1,
                        },
                    }}
                />
            </Modal>
            <style jsx>
                {`
                    :global(.youtube-modal .modal-dialog) {
                        max-width: 1280px;
                    }
                    
                    :global(.youtube-modal .modal-content) {
                        background: none;
                        border: none;
                    }
                `}
            </style>
        </React.Fragment>
    );
};
