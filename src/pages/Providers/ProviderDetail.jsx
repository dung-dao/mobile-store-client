import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card} from 'antd';
import AppLayout from "../../layouts/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import {deleteProvider, login, providersSelector, updateProvider} from "../../redux";
import {useParams, useLocation} from 'react-router-dom';
import IF from "../../components/IF";

const ProviderDetail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pageState = location.state;

    //Config
    const readOnly = pageState.action === "view";
    const provider = pageState.payload;

    const onSubmit = () => {

    };

    return (
        <AppLayout>
            <Card
                title={"Chi Tiết Nhà Cung Cấp"}>
                <Form
                    initialValues={provider}
                    labelCol={{span: 4}}
                    labelAlign={"left"}
                    wrapperCol={{span: 12}}
                    onFinish={(values) => {
                        dispatch(updateProvider(values))
                    }}
                >
                    <Form.Item
                        label="ID"
                        name="id"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                    <Form.Item
                        label="Tên Nhà Cung Cấp"
                        name="name"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                    <Form.Item
                        label="Địa Chỉ"
                        name="address"
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="button" style={{marginRight: "1em"}}>
                            Làm mới
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Lưu lại
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </AppLayout>
    );
};

export default ProviderDetail;