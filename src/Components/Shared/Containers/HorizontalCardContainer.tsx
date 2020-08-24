import { default as React, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Content } from "../../../Domain/Models/Abstractions";
import { ContentCard } from "../Cards/ContentCard";
import { YoutubeModal } from "../Modals";
import { HistoryModal } from "../Modals";
import { Spinner } from "../Spinner";

interface IProps<T> {
    items: T[];
    nextLoading: boolean;
    nextFunction: any;
    history?: boolean;
    message?: string;
}

export const HorizontalCardContainer: React.FC<IProps<Content>> = <T extends Content>(props: IProps<T>): JSX.Element => {
    const [showYoutubeModal, setShowYoutubeModal] = useState<[boolean, string]>([false, undefined]);
    const [showHistoryModal, setShowHistoryModal] = useState<[boolean, number]>([false, undefined]);

    const openYoutubeModal = (id: string): void => {
        setShowYoutubeModal([true, id]);
    };

    return (
        <>
            <YoutubeModal data={showYoutubeModal} setData={setShowYoutubeModal}/>
            {props.history && (
                <HistoryModal
                    visible={showHistoryModal}
                    setVisible={setShowHistoryModal}
                />
            )}
            {props.items.length > 0 ? (
                <>
                    {props.items.map((item) => (
                        <ContentCard
                            key={item.id}
                            item={item}
                            openYoutubeModal={openYoutubeModal}
                            message={props.message}
                            history={props.history}
                            setShowHistoryModal={setShowHistoryModal}
                        />
                    ))}
                    <div className="container-item">
                        {props.nextLoading && (
                            <Spinner marginTop={0} marginBottom={10}/>
                        )}
                        <Waypoint horizontal={true} onEnter={() => props.nextFunction()}/>
                    </div>
                </>
            ) : (
                <Spinner/>
            )}
        </>
    );
};
