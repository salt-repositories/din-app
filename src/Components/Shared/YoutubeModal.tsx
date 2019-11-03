import React from "react";
import { useDispatch } from "react-redux";
import YouTube from "react-youtube";
import { ComponentsActions } from "../../Store/Components/actions";

interface IProps {
    show: boolean;
    trailerId: string;
}

export const YoutubeModal = (props: IProps): JSX.Element => {
    const dispatch = useDispatch();

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
