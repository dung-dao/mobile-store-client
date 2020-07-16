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

    function roleToLabel(role) {
        switch (role) {
            case 'admin':
                return 'Quản lý';
            case  'salesman':
                return 'Nhân viên bán hàng';
            case 'warehouseman':
                return 'Thủ kho';
            default:
                return '';
        }
    }

    return (
        <React.Fragment>
            <Header>
                <Row align="middle" justify="space-between">
                    <img src={require('../app/logo.png')} height={64}/>
                    <Space>
                        {props.role ? (<Tag color="red">{roleToLabel(props.role).toUpperCase()}</Tag>) : null}
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
