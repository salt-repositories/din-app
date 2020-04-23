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
            {props.children}
            <style jsx global>
                {`
                        body {
                            position: relative;
                            font-family: 'Roboto', sans-serif;
                            background-color: #000000a8;
                            overflow: hidden;
                        }
                    `}
            </style>
        </div>
    );
};
