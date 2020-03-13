import { Breadcrumb } from "antd";
import Router from "next/router";
import { default as React, ReactNode } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { SideMenu } from "../Components/Shared/SideMenu";

interface ICrumb {
    path: string;
    name?: string;
    icon?: ReactNode;
}

interface IProps {
    children: React.ReactNode;
    crumbs: ICrumb[];
}

export const WithMenu: React.FC<IProps> = (props: IProps) => (
    <>
        <SideMenu/>
        <Breadcrumb className="breadcrumb">
            {props.crumbs.map((crumb: ICrumb) => (
                <Breadcrumb.Item key={crumb.name}>
                        <span
                            onClick={() => Router.push(crumb.path)}
                            style={{cursor: "pointer"}}
                        >
                            {crumb.icon ?? crumb.name}
                        </span>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
        <Scrollbars
            universal={true}
            autoHeight={true}
            className="main-content"
        >
            {props.children}
        </Scrollbars>
        <style jsx>
            {`
                 :global(.breadcrumb) {
                    position: fixed;
                    top: 12px;
                    left: 120px;
                 }
                 
                :global(.main-content) {
                    margin: 50px 20px 20px 120px;
                    max-height: 100% !important;
                    width: unset !important;
                }
                
                :global(.main-content > div) {
                    max-height: 90vh !important;
                }
            `}
        </style>
    </>
);
