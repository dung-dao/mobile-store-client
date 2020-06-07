import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
// import {createProvider, deleteProvider, login, providersSelector, updateProvider} from "../../redux";
import {useParams, useLocation} from 'react-router-dom';
import {push} from 'connected-react-router';
import IF from "../../components/IF";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import {numberRegex, vietnameseRegex} from "../../utils/validate";
import {createCustomer, searchCustomer, updateCustomer} from "../../redux";

const CustomerDetail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pageState = location.state;

    const back = () => {
        dispatch(push('/customers'));
        dispatch(searchCustomer());
    }

    //Config
    const readOnly = pageState.action === "view";
    const provider = pageState.payload;

    return (
        <React.Fragment>
            <Card
                title={
                    <Space align={"center"}>
                        <Button
                            shape={"circle"}
                            onClick={back}
                        >
                            <ArrowLeftOutlined/>
                        </Button>
                        <h3 style={{margin: 0}}>Thông tin khách hàng</h3>
                    </Space>
                }>
                <Form
                    initialValues={provider}
                    labelCol={{span: 4}}
                    labelAlign={"left"}
                    wrapperCol={{span: 8}}
                    onFinish={(values) => {
                        if (pageState.action === "edit") {
                            dispatch(updateCustomer(values));
                        } else if (pageState.action === "create") {
                            dispatch(createCustomer(values));
                        }
                        back();
                    }}
                >
                    <IF condt={pageState.action !== 'create'}>
                        <Form.Item
                            label="ID"
                            name="id"
                        >
                            <Input readOnly={readOnly || pageState.action === "edit"}/>
                        </Form.Item>
                    </IF>

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
                    <Form.Item
                        label="Địa Chỉ"
                        name="address"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
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
                    <IF condt={pageState.action !== "view"}>
                        <Form.Item>
                            <Button htmlType="button" style={{marginRight: "1em"}}>
                                Làm mới
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Lưu lại
                            </Button>
                        </Form.Item>
                    </IF>
                </Form>
            </Card>
        </React.Fragment>
    );
};

export default CustomerDetail;
