import { Breadcrumb } from "antd";
import Router from "next/router";
import { default as React, ReactNode } from "react";
import { SideMenu } from "../Components/Shared/SideMenu";

interface ICrumb {
    name: string;
    icon?: ReactNode;
}

interface IProps {
    children: React.ReactNode;
    crumbs: ICrumb[];
}

export const WithMenu: React.FC<IProps> = (props: IProps) => (
    <>
        <SideMenu/>
        <div className="main-content">
            <Breadcrumb className="breadcrumb">
                {props.crumbs.map((crumb: ICrumb) => (
                    <Breadcrumb.Item key={crumb.name}>
                        <span
                            onClick={() => Router.push(`/${crumb.name}`)}
                            style={{cursor: "pointer"}}
                        >
                            {crumb.icon ?? crumb.name}
                        </span>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            {props.children}
        </div>
        <style jsx>
            {`
                .main-content {
                    margin: 50px 20px 20px 120px;
                }
                
                :global(.main-content .breadcrumb) {
                    position: fixed;
                    top: 10px;
                }
            `}
        </style>
    </>
);
