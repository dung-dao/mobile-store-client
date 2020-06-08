import React from 'react';
import {createCustomer, searchCustomer, updateCustomer} from "../../redux";
import {Button, Col, Form, Input, Row, Space} from "antd";
import IF from "../common/IF";
import {numberRegex, vietnameseRegex} from "../../utils/validate";
import PropTypes from "prop-types";

const CustomerInputs = (props) => {
    const readOnly = props.action !== 'INPUT';
    const ExtendedNode = props.children;
    return (
        <React.Fragment>
            <Row gutter={16}>
                <IF condt={readOnly}>
                    <Col>
                        <Form.Item
                            label="ID"
                            name="id"
                        >
                            <Input readOnly={true}/>
                        </Form.Item>
                    </Col>
                </IF>
                <Col xs={24} md={12}>
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
                <Col xs={24} md={12}>
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
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Địa Chỉ"
                        name="address"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
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
            </Row>
        </React.Fragment>
    );
};

CustomerInputs.propTypes = {
    initialValues: PropTypes.object,
    action: PropTypes.string.isRequired,
};

export default CustomerInputs;