import React from 'react';
import {createCustomer, searchCustomer, updateCustomer} from "../../redux";
import {Button, Col, Form, Input, InputNumber, Row, Select, Space} from "antd";
import IF from "../common/IF";
import {numberRegex, vietnameseRegex} from "../../utils/validate";
import PropTypes from "prop-types";

const ProductInputs = (props) => {
    const span = {span: 6};
    const readOnly = props.action === 'VIEW';
    return (
        <React.Fragment>
            <Row gutter={16}>
                <IF condt={props.action !== "CREATE"}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="ID"
                            name="id"
                            labelCol={span}
                            labelAlign="left"
                        >
                            <Input readOnly={true}/>
                        </Form.Item>
                    </Col>
                </IF>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        labelCol={span}
                        labelAlign="left"
                        rules={[
                            {required: true, message: 'Vui lòng nhập tên'},
                            {max: 255, message: 'Tên vượt quá độ dài cho phép'}
                        ]}
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Danh mục"
                        name="categoryId"
                        labelCol={span}
                        labelAlign="left"
                    >
                        <Select disabled={readOnly} defaultValue={1}>
                            <Select.Option value={1}>Điện thoại</Select.Option>
                            <Select.Option value={2}>Máy tính bảng</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Tên mã"
                        name="codeName"
                        labelCol={span}
                        labelAlign="left"
                        rules={[
                            {required: true, message: 'Vui lòng nhập tên mã'},
                            {max: 255, message: 'Tên mã vượt quá độ dài cho phép'}
                        ]}
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Hãng sản xuất"
                        name="manufactureId"
                        labelCol={span}
                        labelAlign="left"
                    >
                        <Select disabled={readOnly} defaultValue={1}>
                            <Select.Option value={1}>Samsung</Select.Option>
                            <Select.Option value={2}>Apple</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Nước sản xuất"
                        name="madeIn"
                        labelCol={span}
                        labelAlign="left"
                        rules={[
                            {max: 10000, message: 'Tên vượt quá độ dài cho phép'}
                        ]}
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Giá bán"
                        name="amount"
                        labelCol={span}
                        labelAlign="left"
                        rules={[
                            {required: true, message: "Nhập giá bán"}
                        ]}
                    >
                        <InputNumber
                            readOnly={readOnly}
                            defaultValue={1000000}
                            min={0}
                            max={1000000000}
                            step={100000}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        labelCol={span}
                        labelAlign="left"
                        rules={[
                            {max: 10000, message: 'Mô tả vượt quá độ dài cho phép'}
                        ]}
                    >
                        <Input.TextArea readOnly={readOnly}/>
                    </Form.Item>
                </Col>
            </Row>
        </React.Fragment>
    );
};

ProductInputs.propTypes = {
    initialValues: PropTypes.object,
    action: PropTypes.string.isRequired,
};

export default ProductInputs;