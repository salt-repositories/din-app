import Head from "next/head";
import React from "react";
import { initGA, logPageView } from "../Domain/Utils/Analytics";


type CustomWindow = Window & typeof globalThis & {
    GA_INITIALIZED: boolean,
};

export default class Layout extends React.Component {
    public componentDidMount(): void {
        if (!(window as CustomWindow).GA_INITIALIZED) {
            initGA();
            (window as CustomWindow).GA_INITIALIZED = true;
        }
        logPageView();
    }

    public render(): JSX.Element {
         return (
             <div>
                 <Head>
                     <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
                     <link rel="icon" href="/static/favicon.ico" type="image/x-icon"/>
                     <title>DIN</title>
                 </Head>
                 {this.props.children}
                 <style jsx global>
                     {`
                        body {
                            position: relative;
                            font-family: 'Roboto', sans-serif;
                            background-color: #000000a8;
                        }
                    `}
                 </style>
             </div>
         );
     }
}
