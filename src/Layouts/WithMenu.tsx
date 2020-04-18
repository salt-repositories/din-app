import { Breadcrumb } from "antd";
import Link from "next/link";
import { default as React, ReactNode } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { SideMenu } from "../Components/Shared/Menus/SideMenu";

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
        <div className="header">
            <Breadcrumb className="breadcrumb">
                {props.crumbs.map((crumb: ICrumb) => (
                    <Breadcrumb.Item key={crumb.path}>
                        <Link href={crumb.path}>
                            <a>{crumb.icon ?? crumb.name}</a>
                        </Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
        <Scrollbars
            universal={true}
            autoHeight={true}
            className="main-content"
        >
            {props.children}
        </Scrollbars>
        <style jsx>
            {`
                .header {
                    position: fixed;
                    top: 0;
                    left: 100px;
                    box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);
                    width: 100%;
                    height: 45px;
                }
                
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
