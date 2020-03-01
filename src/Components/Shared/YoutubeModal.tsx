import { Modal } from "antd";
import { Actions } from "easy-peasy";
import React from "react";
import YouTube from "react-youtube";
import { IRootState, useStoreActions } from "../../Store";

interface IProps {
    visible: boolean;
    trailerId: string;
}

export const YoutubeModal = (props: IProps): JSX.Element => {
    const showYoutubeModal = useStoreActions((actions: Actions<IRootState>) =>
        actions.components.recentlyAdded.setShowYoutubeModal);

    return (
        <React.Fragment>
            <Modal
                visible={props.visible}
                onCancel={() => showYoutubeModal(false)}
                className="youtube-modal"
                footer={<></>}
                centered
                width={null}
                destroyOnClose={true}
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
                    :global(.youtube-modal .ant-modal-content) {
                        background: none;
                        border: none;
                        box-shadow: none;
                    }
                    
                    :global(.youtube-modal .ant-modal-footer) {
                        border: none;
                    }
                `}
            </style>
        </React.Fragment>
    );
};
