import React from 'react';
import PropTypes from "prop-types";
import IF from "../common/IF";
import {Col, Form, Input, Select} from "antd";
import {phoneValidate, requiredValidate, viValidate} from "../../utils/validate";
import TextArea from "antd/es/input/TextArea";

const UserRegisterInput = (props) => {
    const readOnly = props.readOnly;
    const span = props.span;
    const action = props.action;

    return (
        <React.Fragment>
            <IF condt={action !== 'CREATE'}>
                <Col xs={24} md={span}>
                    < Form.Item
                        label="ID"
                        name="id"
                    >
                        < Input
                            readOnly={true}
                        />
                    </Form.Item>
                </Col>
            </IF>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Họ tên"
                    name="fullname"
                    rules={[
                        ...viValidate('họ tên'),
                        ...requiredValidate('họ tên')
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Vai trò"
                    name="role"
                    rules={[
                        {required: true, message: 'Vui lòng nhập vai trò'},
                    ]}
                >
                    <Select
                        options={[
                            {label: "Admin", value: "admin"},
                            {label: "Nhân viên", value: "salesman"},
                            {label: "Thủ kho", value: "storekeeper"}
                        ]}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Tên đăng nhập"
                    name="name"
                    rules={[
                        {pattern: /^[a-zA-Z0-9]*$/, message: 'Tên đăng nhập không hợp lệ'},
                        ...requiredValidate('tên đăng nhập')
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <IF condt={action !== "VIEW"}>
                <Col xs={24} md={span}>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {required: (action === "CREATE"), message: 'Vui lòng nhập mật khẩu'},
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Col>
            </IF>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        ...phoneValidate(),
                        ...requiredValidate('số điện thoại')
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {type: "email", message: "Email không hợp lệ"},
                        ...requiredValidate('email')
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        ...requiredValidate('địa chỉ')
                    ]}
                >
                    <TextArea readOnly={readOnly}/>
                </Form.Item>
            </Col>
        </React.Fragment>
    );
};

UserRegisterInput.propTypes = {
    span: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired
};


export default UserRegisterInput;
