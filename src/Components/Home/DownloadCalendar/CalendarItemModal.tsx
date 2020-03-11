import { Button, Col, Modal, Row } from "antd";
import { default as React } from "react";
import { Movie } from "../../../Domain/Models/Movies";
import { TvShowCalendar } from "../../../Domain/Models/TvShow";

interface IProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
    item: Movie | TvShowCalendar;
}

export const CalendarItemModal: React.FC<IProps> = (props: IProps) => {
    return (
        <Modal
            visible={props.visible}
            onOk={() => props.setVisible(false)}
            onCancel={() => props.setVisible(false)}
            footer={<Button type="primary" onClick={() => props.setVisible(false)}>Close</Button>}
        >
            <>
                {props.item && props.item instanceof Movie ? (
                    <Row>
                        <Col span={10}>
                            <img
                                src={props.item.posterPath ? `https://image.tmdb.org/t/p/w500/${props.item.posterPath}` : "https://i.imgur.com/kofVyyQ.png?1"}
                                onClick={() => window.open((props.item as Movie).plexUrl)}
                            />
                        </Col>
                        <Col span={14}>

                        </Col>
                    </Row>

                ) : (
                    <></>
                )}
            </>
        </Modal>
    );
};
