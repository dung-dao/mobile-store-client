import React from 'react';
import {Form, Input, Button, Card} from 'antd';
import AppLayout from "../../layouts/AppLayout";
import {useSelector} from "react-redux";
import {providersSelector} from "../../redux";
import {useParams, useLocation} from 'react-router-dom';
import IF from "../../components/IF";

const ProviderDetail = (props) => {
    const providers = useSelector(providersSelector).providers;
    const location = useLocation();
    const readOnly = location.state.action === "view" ? true : false;
    let inputConfig = {};
    const {id} = useParams();
    let provider = {id: "", name: "", phone: "", address: ""};
    provider = providers.find(e => e.id === id);

    return (
        <AppLayout>
            <Card
                title={"Chi Tiết Nhà Cung Cấp"}>
                <Form
                    initialValues={provider}
                    labelCol={{span: 4, offset: 4}}
                    labelAlign={"left"}
                    wrapperCol={{span: 12}}
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
                </Form>
            </Card>
        </AppLayout>
    );
};

export default ProviderDetail;