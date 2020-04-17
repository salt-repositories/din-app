import "reflect-metadata";

import { Col, Icon, Row } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { withAuthentication } from "../../src/Domain/Authentication";
import { WithMenu } from "../../src/Layouts";
import Layout from "../../src/Layouts/Layout";

const AddMoviePage: NextPage = () => (
    <Layout>
        <Head>
            <title>Add Movie</title>
        </Head>
        <WithMenu crumbs={[{path: "/Movies", icon: <Icon type="video-camera"/>}, {path: "/Movies/Add", name: "Add"}]}>
            <Col span={24}>
                <Row>

                </Row>
            </Col>
        </WithMenu>
    </Layout>
);

export default withAuthentication(AddMoviePage);
