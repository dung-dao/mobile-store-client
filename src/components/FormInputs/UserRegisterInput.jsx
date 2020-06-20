import React from 'react';
import PropTypes from "prop-types";
import IF from "../common/IF";
import {Col, Form, Input, Select} from "antd";

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
                    label="Tên đăng nhập"
                    name="name"
                    rules={[
                        {pattern: /^[a-zA-Z0-9]*$/, message: 'Tên đăng nhập không hợp lệ'}
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
        </React.Fragment>
    );
};

UserRegisterInput.propTypes = {
    span: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired
};


export default UserRegisterInput;
