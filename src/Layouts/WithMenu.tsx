import { Breadcrumb } from "antd";
import { useStoreState } from "easy-peasy";
import Link from "next/link";
import { default as React } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { MINIMAL_WIDTH } from "../Components/Shared/consts";
import { SideMenu } from "../Components/Shared/Menus";
import { IRootState } from "../Store";

interface ICrumb {
    path: string;
    name?: string;
    icon?: React.ReactNode;
}

interface IProps {
    children: React.ReactNode;
    crumbs: ICrumb[];
}

export const WithMenu: React.FC<IProps> = (props: IProps) => {
    const currentWidth = useStoreState((state: IRootState) => state.main.windowWidth);

    return (
        <>
            {currentWidth > MINIMAL_WIDTH && (
                <SideMenu/>
            )}
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
                    left: ${currentWidth > MINIMAL_WIDTH ? "100px" : ""};
                    box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);
                    width: 100%;
                    height: 45px;
                }
            
                div.header :global(.breadcrumb) {
                    position: fixed;
                    top: 12px;
                    left: ${currentWidth > MINIMAL_WIDTH ? "120px" : "20px"};
                }
                
                .header :global(.breadcrumb > span > span) {
                    color: #fff;
                }
                
                .header :global(.breadcrumb > span > span > a) {
                    color: #fff;
                }
                
                .header :global(.breadcrumb > span > span > a:hover) {
                    color: #ff8d1c;
                }
             
                :global(.main-content) {
                    top: 50px;
                    margin: ${currentWidth > MINIMAL_WIDTH ? "0 20px 20px 120px" : "45px 0"};
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
};
