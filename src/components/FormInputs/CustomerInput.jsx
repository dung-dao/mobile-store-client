import React from 'react';
import PropTypes from "prop-types";
import IF from "../common/IF";
import {Col, Form, Input} from "antd";
import {phoneValidate, requiredValidate, vietnameseRegex} from "../../utils/validate";

const CustomerInput = (props) => {
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
                    label="Họ tên"
                    name="name"
                    rules={[
                        ...requiredValidate("Họ tên"),
                        {max: 255, message: 'Tên vượt quá độ dài cho phép'},
                        {pattern: vietnameseRegex, message: 'Họ tên không hợp lệ'}
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Số Điện Thoại"
                    name="phone"
                    rules={[
                        ...phoneValidate(),
                        ...requiredValidate("Số Điện Thoại")
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Địa Chỉ"
                    name="address"
                    rules={[
                        {max: 10000, message: "Địa chỉ quá dài"}
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Địa chỉ email"
                    name="email"
                    rules={[
                        {type: "email", message: "Địa chỉ email không hợp lệ"},
                        ...requiredValidate("Địa chỉ email")
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
        </React.Fragment>
    );
};

CustomerInput.propTypes = {
    span: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired
};


export default CustomerInput;
