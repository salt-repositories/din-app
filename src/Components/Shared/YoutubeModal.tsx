import { Modal } from "antd";
import React from "react";
import YouTube from "react-youtube";

interface IProps {
    data: [boolean, string];
    setData: (values: [boolean, string]) => void;
}

export const YoutubeModal = (props: IProps): JSX.Element => (
    <React.Fragment>
        <Modal
            visible={props.data[0]}
            onCancel={() => props.setData([false, undefined])}
            className="youtube-modal"
            footer={<></>}
            centered
            width={null}
            destroyOnClose={true}
        >
            <YouTube
                videoId={props.data[1]}
                opts={{
                    height: 720,
                    width: 1200,
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
