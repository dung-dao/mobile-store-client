import React from "react";
import {Divider, Layout, Menu} from "antd";
import {UserOutlined,} from "@ant-design/icons";
import "./AppLayout.css";
import AppHeader from "./AppHeader";
import {Link} from 'react-router-dom';
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import BankOutlined from "@ant-design/icons/lib/icons/BankOutlined";
import MobileOutlined from "@ant-design/icons/lib/icons/MobileOutlined";
import ReconciliationOutlined from "@ant-design/icons/lib/icons/ReconciliationOutlined";
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";
import {useSelector} from "react-redux";
import {pathSelector} from "../utils/ReduxHelper";
import {checkPermission} from "../utils/Permission";
import {permissionSelector, userSelector} from "../redux";

const {Content, Sider} = Layout;

const AppLayout = (props) => {
    const path = useSelector(pathSelector);
    const permissions = useSelector(permissionSelector);
    const _user = useSelector(userSelector);
    const providerPer = checkPermission(permissions, 'READ', 'providers');
    const productPer = checkPermission(permissions, 'READ', 'products');
    const customerPer = checkPermission(permissions, 'READ', 'customers');
    const userPer = checkPermission(permissions, 'READ', 'users');
    const orderPer = checkPermission(permissions, 'READ', 'orders');
    const importPer = checkPermission(permissions, 'READ', 'imports');


    let initPath = path.split('/')[1];
    // alert('hit')

    return (
        <Layout className="main-layout">
            <AppHeader role={_user.user.role ? _user.user.role : null}/>
            <Layout className="body">
                <Sider className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={(() => {
                            switch (initPath) {
                                case '':
                                    return ["1"];
                                case 'providers':
                                    return ["2"];
                                case 'products':
                                    return ["3"];
                                case 'customers':
                                    return ["4"];
                                case 'users':
                                    return ["5"];
                                case 'orders':
                                    return ["6"];
                                case 'imports':
                                    return ["7"];
                            }
                        })()}
                        className="menu"
                    >
                        <Menu.Item key={1}>
                            <HomeOutlined/>
                            <Link to={"/"}>Trang chủ</Link>
                        </Menu.Item>
                        <Divider/>

                        {providerPer ? (<Menu.Item key={2}>
                            <BankOutlined/>
                            <Link to={"/providers"}>Nhà cung cấp</Link>
                        </Menu.Item>) : null}


                        {productPer ?
                            (<Menu.Item key={3}>
                                <MobileOutlined/>
                                <Link to={"/products"}>Sản phẩm</Link>
                            </Menu.Item>) : null
                        }

                        {customerPer ? (<Menu.Item key={4}>
                            <TeamOutlined/>
                            <Link to={"/customers"}>Khách hàng</Link>
                        </Menu.Item>) : null}

                        {userPer ? (<Menu.Item key={5}>
                            <UserOutlined/>
                            <Link to={"/users"}>Tài khoản</Link>
                        </Menu.Item>) : null}

                        {orderPer ? (<Menu.Item key={6}>
                            <ReconciliationOutlined/>
                            <Link to={"/orders"}>Đơn hàng</Link>
                        </Menu.Item>) : null}

                        {importPer ? (<Menu.Item key={7}>
                            <ReconciliationOutlined/>
                            <Link to={"/imports"}>Nhập hàng</Link>
                        </Menu.Item>) : null}
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
