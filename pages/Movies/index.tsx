import { Col, Icon, Row } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { withAuthentication } from "../../src/Domain/Authentication";
import { WithMenu } from "../../src/Layouts";
import Layout from "../../src/Layouts/Layout";
import { AppContext } from "../../src/Store/AppContext";

interface IProps {

}

const MoviesPage: NextPage = () => (
    <Layout>
        <Head>
            <title>Movies</title>
        </Head>
        <WithMenu crumbs={[{path: "/Movies", icon: <Icon type="video-camera"/>}]}>
            <Col span={24}>
                <Row>

                </Row>
            </Col>
        </WithMenu>
    </Layout>
);

MoviesPage.getInitialProps = async (context: AppContext): Promise<IProps> => {

    return {};
};

export default withAuthentication(MoviesPage);

