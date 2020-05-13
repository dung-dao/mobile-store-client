import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown, Button } from "antd";
import { ReactComponent as Logo } from "../app/logo.svg";
import "./AppHeader.css";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { push } from "connected-react-router";
const { Header } = Layout;

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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Hi 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
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
