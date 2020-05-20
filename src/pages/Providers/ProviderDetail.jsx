import React from 'react';
import {Form, Input, Button, Card} from 'antd';
import AppLayout from "../../layouts/AppLayout";

const ProviderDetail = () => {
    return (
        <AppLayout>
            <Card
                title={"Chi Tiết Nhà Cung Cấp"}>
                <Form
                    labelCol={{span: 4, offset: 4}}
                    labelAlign={"left"}
                    wrapperCol={{span: 12}}
                >
                    <Form.Item
                        label="ID"
                        name="id"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Tên Nhà Cung Cấp"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Địa Chỉ"
                        name="address"
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Card>
        </AppLayout>
    );
};

export default ProviderDetail;