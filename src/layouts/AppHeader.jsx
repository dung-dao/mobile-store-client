import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {Layout, Menu, Dropdown, Button} from "antd";
import {ReactComponent as Logo} from "../app/logo.svg";
import "./AppHeader.css";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {logout, userSelector} from "../redux/userSlice";
import {push} from "connected-react-router";

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
                    <Button type="primary" icon={<UserOutlined></UserOutlined>}>
                        User
                    </Button>
                </Dropdown>
            </Header>
        </React.Fragment>
    );
};

export default AppHeader;
