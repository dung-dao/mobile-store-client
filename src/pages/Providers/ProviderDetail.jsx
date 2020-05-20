import React from 'react';
import {Form, Input, Button} from 'antd';
import AppLayout from "../../layouts/AppLayout";

const ProviderDetail = () => {
    return (
        <AppLayout>
            <Form>
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
        </AppLayout>
    );
};

export default ProviderDetail;