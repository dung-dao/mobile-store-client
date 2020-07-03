import React from "react";
import "./SignIn.css";
import {Redirect} from "react-router-dom";
import BlankLayout from "../../layouts/BlankLayout";
import {login, userSelector} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, Col, Form, Input, Row} from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
    labelAlign: "left"
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const SignIn = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    if (user && user.isLogged) return <Redirect to="/"></Redirect>;
    return (
        <BlankLayout>
            <Row align="middle" justify="center">
                <Col md={8} xs={24}>
                    <Form
                        {...layout}
                        style={{marginTop: "8em"}}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={(values) => {
                            dispatch(login(values));
                        }}
                    >
                        <Form.Item
                            label="Tên đăng nhập"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập tên đăng nhập!",
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập mật khẩu!",
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Lưu mật khẩu</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={user.isFetching}>
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </BlankLayout>
    );
};

export default SignIn;
