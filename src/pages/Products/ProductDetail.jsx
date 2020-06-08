import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, Space, Row, Col} from 'antd';
// import {useDispatch, useSelector} from "react-redux";
// import {createProvider, deleteProvider, login, providersSelector, updateProvider} from "../../redux";
import {useParams, useLocation} from 'react-router-dom';
import {push} from 'connected-react-router';
import IF from "../../components/IF";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import {numberRegex, vietnameseRegex} from "../../utils/validate";
import {createCustomer, searchCustomer, updateCustomer} from "../../redux";
import ProductViewer from "./ProductViewer";

const ProductDetail = (props) => {
    // const dispatch = useDispatch();
    const location = useLocation();
    const action = location.state.action;

    const back = () => {
        // dispatch(push('/customers'));
        // dispatch(searchCustomer());
    }

    //Config
    const readOnly = action === "view";
    const provider = location.state.payload;

    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title={
                            <Space align={"center"}>
                                {/*<Button*/}
                                {/*    shape={"circle"}*/}
                                {/*    onClick={back}*/}
                                {/*>*/}
                                {/*    <ArrowLeftOutlined/>*/}
                                {/*</Button>*/}
                                <h3 style={{margin: 0}}>Thông tin khách hàng</h3>
                            </Space>
                        }>
                        <Form
                            initialValues={provider}
                            labelCol={{span: 8}}
                            labelAlign={"left"}
                            wrapperCol={{span: 16}}
                            onFinish={(values) => {
                                if (action === "edit") {
                                    // dispatch(updateCustomer(values));
                                } else if (action === "create") {
                                    // dispatch(createCustomer(values));
                                }
                                back();
                            }}
                        >
                            <Row gutter={16}>
                                <IF condt={action !== 'create'}>
                                    <Col>

                                        <Form.Item
                                            label="ID"
                                            name="id"
                                        >
                                            <Input readOnly={readOnly || action === "edit"}/>
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
                            <Row justify="end" style={{marginBottom: 0}}>
                                <IF condt={action !== "view"}>
                                    <Form.Item>
                                        <Space style={{paddingLeft: "auto"}}>
                                            <Button htmlType="button">
                                                Làm mới
                                            </Button>
                                            <Button type="primary" htmlType="submit">
                                                Lưu lại
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </IF>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title={"Lịch sử đặt hàng"}>
                        <ProductViewer/>
                    </Card>
                </Col>
            </Row>
            <Row>

            </Row>


        </React.Fragment>
    );
};

export default ProductDetail;
