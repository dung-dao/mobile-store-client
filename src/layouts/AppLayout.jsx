import React from "react";
import {Divider, Layout, Menu} from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import "./AppLayout.css";
import AppHeader from "./AppHeader";
import {Link} from 'react-router-dom';
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import BankOutlined from "@ant-design/icons/lib/icons/BankOutlined";
import MobileOutlined from "@ant-design/icons/lib/icons/MobileOutlined";

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

const AppLayout = (props) => {
    return (
        <Layout className="main-layout">
            <AppHeader></AppHeader>
            <Layout className="body">
                <Sider className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        className="menu"
                    >
                        <Menu.Item key={1}>
                            <HomeOutlined/>
                            <Link to={"/"}>Trang chủ</Link>
                        </Menu.Item>
                        <Divider/>
                        <Menu.Item key={2}>
                            <BankOutlined />
                            <Link to={"/providers"}>Nhà cung cấp</Link>
                        </Menu.Item>
                        <Menu.Item key={3}>
                            <MobileOutlined />
                            <Link to={"/products"}>Sản phẩm</Link>
                        </Menu.Item>
                        <Menu.Item key={4}>
                            <UserOutlined />
                            <Link to={"/customers"}>Khách hàng</Link>
                        </Menu.Item>
                        <Menu.Item key={5}>
                            <UserOutlined />
                            <Link to={"/customers"}>Tài khoản</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Content className="content">
                        {props.children ? props.children : "Blank Page"}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
