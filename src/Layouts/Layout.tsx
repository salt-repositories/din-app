import { Actions } from "easy-peasy";
import Head from "next/head";
import React, { ReactNode, useEffect } from "react";
import { initGA, logPageView } from "../Domain/Utils";
import { IRootState, useStoreActions } from "../Store";

interface IProps {
    children: ReactNode;
}

type CustomWindow = Window & typeof globalThis & {
    GA_INITIALIZED: boolean,
};

export const Layout: React.FC<IProps> = (props: IProps) => {
    const setWindowWidth = useStoreActions((actions: Actions<IRootState>) => actions.main.setWindowWidth);

    useEffect(() => {
        if (!(window as CustomWindow).GA_INITIALIZED) {
            initGA();
            (window as CustomWindow).GA_INITIALIZED = true;
        }
        logPageView();
    }, []);

    if (process.browser) {
        useEffect(() => {
            const resizeListener = () => {
                setWindowWidth(window.innerWidth);
            };

            setWindowWidth(window.innerWidth);
            window.addEventListener("resize", resizeListener);

            return () => {
                window.removeEventListener("resize", resizeListener);
            }
        }, []);
    }

    return (
        <div>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap"/>
                <link rel="icon" href="/static/favicon.ico" type="image/x-icon"/>
                <title>DIN</title>
            </Head>
            <div className="fade"/>
            <div className="grain"/>
                {props.children}
            <style jsx global>
                {`
                    body {
                        position: relative;
                        font-family: 'Roboto', sans-serif;
                        background: #000000a8;
                        overflow: hidden;
                    }
                    
                    .fade {
                        position: absolute;
                        background-image: url("/static/Images/background_fade.png");
                        width: 100%;
                        height: 100%;
                        background-size: cover;
                        background-position: center center;
                        background-repeat: no-repeat;
                    }
                    
                    .grain {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background: url("/static/Images/background_grain.png") repeat scroll 0% 0%;
                    }
                                
                    :global(.ant-input-prefix) {
                        margin-right: 10px;
                    }
                    
                    :global(.input-wrapper .ant-input-affix-wrapper) {
                        border: none !important;
                        box-shadow: none;
                    }
                    
                    :global(.input-wrapper .ant-input-affix-wrapper-focused) {
                        border: none;
                    }
                    
                    :global(.input-wrapper .ant-form-item-has-error .ant-input-affix-wrapper-focused) {
                        border: none;
                    }
                `}
            </style>
        </div>
    );
};
