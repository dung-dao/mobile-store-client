import React from "react";
import {Button, Dropdown, Layout, Menu, Row, Space, Tag} from "antd";
import "./AppHeader.css";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {logout} from "../redux/UserSlice";
import {push} from "connected-react-router";
import Avatar from "antd/es/avatar";

const {Header} = Layout;

const AppHeader = (props) => {
    const dispatch = useDispatch();
    const userMenu = (
        <Menu>
            <Menu.Item>
                <Button
                    type="link"
                    onClick={() => {
                        dispatch(logout());
                        dispatch(push("/signin"));
                    }}
                >
                    Đăng xuất
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <React.Fragment>
            <Header>
                <Row align="middle" justify="space-between">
                    {/*<Logo height="48px" width="48px"/>*/}
                    <img src={require('../app/logo.png')} height={64}/>
                    <Space>
                        <Tag color="red">Admin</Tag>
                        <Dropdown
                            overlay={userMenu}
                            placement="bottomLeft"
                            className="user-dropdown"
                        >
                            <Avatar size={46} icon={<UserOutlined/>}/>
                        </Dropdown>
                    </Space>
                </Row>
            </Header>
        </React.Fragment>
    );
};

export default AppHeader;
