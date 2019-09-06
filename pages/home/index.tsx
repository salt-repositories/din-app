import "reflect-metadata";

import {HomeActions} from "@Actions/HomeActions";
import FullScreenCarousel from "@Components/FullScreenCarousel";
import {IHomePage} from "@Interfaces/Pages/Home";
import {IStore} from "@Interfaces/Redux/Store";
import ForgotPasswordModal from "@Layouts/Index/ForgotPasswordModal";
import LoginForm from "@Layouts/Index/LoginForm";
import Layout from "@Layouts/Layout";
import Head from "next/head";
import {Component, Dispatch} from "react";
import {connect, DispatchProp} from "react-redux";
import {bindActionCreators} from "redux";

class HomePage extends Component<IHomePage.IProps, IHomePage.IState> {
    constructor(props: IHomePage.IProps) {
        super(props);
    }

    public render(): JSX.Element {

        const props = this.props;
        // tslint:disable-next-line:no-console
        console.log(props);

        return (
            <Layout>
                <Head>
                    <title>Login</title>
                </Head>
                <FullScreenCarousel images={this.props.backgrounds}/>
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

const mapStateToProps = (state: IStore) => state.home;
const mapDispatchToProps = (dispatch: Dispatch) => ({Map: bindActionCreators(HomeActions.Map, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


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

