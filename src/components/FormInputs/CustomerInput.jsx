import React from 'react';
import PropTypes, {number} from "prop-types";
import IF from "../common/IF";
import {Col, Form, Input} from "antd";
import {numberRegex, vietnameseRegex} from "../../utils/validate";

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
                    label="Họ và tên"
                    name="name"
                    rules={[
                        {required: true, message: 'Vui lòng nhập họ tên'},
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
                        {pattern: numberRegex, message: 'Số điện thoại chỉ gồm số'},
                        {required: true, message: 'Số điện thoại không được để trống'},
                        {max: 12, message: 'Số điện thoại không hợp lệ'},
                    ]}
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Địa Chỉ"
                    name="address"
                >
                    <Input readOnly={readOnly}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={span}>
                <Form.Item
                    label="Địa chỉ email"
                    name="email"
                    rules={[
                        {type: "email", message: "Email không hợp lệ"},
                        {required: true, message: 'Số điện thoại không được để trống'}
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