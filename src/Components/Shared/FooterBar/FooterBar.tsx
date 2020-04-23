import { useStoreState } from "easy-peasy";
import React, { ReactNodeArray } from "react";
import { IRootState } from "../../../Store";
import { MINIMAL_WIDTH } from "../consts";

interface IProps {
    buttons: ReactNodeArray;
}

export const FooterBar: React.FC<IProps> = (props: IProps): JSX.Element => {
    const currentWidth = useStoreState((state: IRootState) => state.main.windowWidth);

    return (
        <>
            <div className="footer-bar">
                {props.buttons}
            </div>
            <style jsx>
                {`
                    .footer-bar {
                        position: fixed;
                        bottom: 0;
                        margin-left: ${currentWidth > MINIMAL_WIDTH ? "-20px" : ""};
                        width: 100%;
                        height: 5em;
                        background-color: #555;
                        box-shadow: 0 -3px 6px 0 rgba(0,0,0,.15);
                    }
                    
                    .footer-bar :global(button) {
                        margin: 20px;
                        background: #575757;
                        color: #fff;
                    }
                    
                    .footer-bar :global(button):hover {
                        color: #ff8d1c;
                    }
                    
                    .footer-bar :global(button a i) {
                        margin-right: .8em;
                    }
                `}
            </style>
        </>
    );
};
