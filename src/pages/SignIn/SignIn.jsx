import React from "react";
import { Redirect } from "react-router-dom";
import BlankLayout from "../../layouts/BlankLayout";
import { Form, Input, Button, Checkbox } from "antd";
import { Row } from "antd";
import { login, userSelector } from "../../redux";
import { useDispatch, useSelector } from "react-redux";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
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
  if (user.user) {
    return <Redirect to="/" />;
  }
  return (
    <BlankLayout>
      <Row align="middle" justify="center" style={{ padding: "4em" }}>
        <Form
          {...layout}
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
            <Input />
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
            <Input.Password />
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
      </Row>
    </BlankLayout>
  );
};

export default SignIn;
