import React from 'react';
import FormLayout from "../../components/common/FormLayout";
import UserRegisterInput from "../../components/FormInputs/UserRegisterInput";
import {Button, Form, Row, Space} from "antd";

const UserRegisterv2 = () => {
    return (
        <React.Fragment>
            <FormLayout title="Dang ky">
                <Form
                    labelCol={{span: 8}}
                    labelAlign={"left"}
                    wrapperCol={{span: 16}}
                    // onFinish={values => onFinish(values)}
                >
                    <Row gutter={16}>
                        <UserRegisterInput span={12} readOnly={false} action="CREATE"/>
                    </Row>
                    <Row justify="end" style={{marginBottom: 0}}>
                        <Form.Item>
                            <Space style={{paddingLeft: "auto"}}>
                                <Button htmlType="button">
                                    Làm mới
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>
                            </Space>
                        </Form.Item>
                    </Row>
                </Form>
            </FormLayout>
        </React.Fragment>
    );
};

export default UserRegisterv2;
