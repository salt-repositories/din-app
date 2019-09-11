import "reflect-metadata";

import FullScreenCarousel from "../../src/Components/FullScreenCarousel";
import ForgotPasswordModal from "../../Layouts/Index/ForgotPasswordModal";
import LoginForm from "../../Layouts/Index/LoginForm";
import Layout from "../../Layouts/Layout";
import Head from "next/head";
import React, {Component} from "react";

class HomePage extends Component {

    public static getInitialProps({ store, req }) {
        const isServer = !!req;

        return {};
    }

    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Layout>
                <Head>
                    <title>Login</title>
                </Head>
                <FullScreenCarousel images={null}/>
                <LoginForm handleShow/>
                <ForgotPasswordModal
                    show
                    setShow
                    keyElement
                    setKey
                />
            </Layout>
        );
    }
}

export default HomePage;

// export const Index2: NextPage = (props: any): JSX.Element => {
//     const [show, setShow] = useState(false);
//     const [key, setKey] = useState("first");
//
//     const handleShow = () => {
//         setShow(true);
//     };
//
//
// };
//
// Index.getInitialProps = async (context: NextPageContext): Promise<{}> => {
//     const backgrounds = await apiClient.v1.media.getBackgrounds();
//     const gif = await apiClient.v1.media.getGifsByTag("funny");
//
//     return { backgrounds, gif };
// };

