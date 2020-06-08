import React from "react";
import {Layout, Menu, Dropdown, Button} from "antd";
import {ReactComponent as Logo} from "../app/logo.svg";
import "./AppHeader.css";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {logout} from "../redux/userSlice";
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
            <Header className="Header">
                <Logo height="48px" width="48px"></Logo>
                <Dropdown
                    overlay={userMenu}
                    placement="bottomLeft"
                    className="user-dropdown"
                >
                    <Avatar size={46} icon={<UserOutlined />} />
                </Dropdown>
            </Header>
        </React.Fragment>
    );
};

export default AppHeader;
