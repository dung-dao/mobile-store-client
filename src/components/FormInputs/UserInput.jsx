import React from 'react';
import PropTypes, {number} from "prop-types";
import IF from "../common/IF";
import {Col, Form, Input, Select} from "antd";
import {numberRegex, vietnameseRegex} from "../../utils/validate";

const UserInput = (props) => {
    const readOnly = props.readOnly;
    const span = props.span;
    return (
        <React.Fragment>
            <IF condt={props.action !== 'CREATE'}>
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
                        {required: true, message: 'Vui lòng nhập tên đăng nhập'},
                        {max: 255, message: 'Tên vượt quá độ dài cho phép'},
                        {pattern: vietnameseRegex, message: 'Tên đăng nhập không hợp lệ'}
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
                    {/*TODO: Thêm Role chính xác*/}
                    <Select
                        options={[
                            {label: "Admin", value: "admin"},
                            {label: "Nhân viên", value: "admin"},
                            {label: "Thủ kho", value: "admin"}
                        ]}
                    />
                </Form.Item>
            </Col>
        </React.Fragment>
    );
};

UserInput.propTypes = {
    span: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired
};


export default UserInput;