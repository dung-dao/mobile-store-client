import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card} from 'antd';
import AppLayout from "../../layouts/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import {createProvider, deleteProvider, login, providersSelector, updateProvider} from "../../redux";
import {useParams, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

const DetailPage = (props) => {
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
                title={props.pageTitle}>
                <Form
                    initialValues={props.initialValues}
                    labelCol={{span: 4}}
                    labelAlign={"left"}
                    wrapperCol={{span: 12}}
                    onFinish={(values) => {
                        if (pageState.action === "edit")
                            dispatch(props.updateAction(values));
                        else if (pageState.action === "create") {
                            dispatch(props.createAction(values));
                        }
                    }}>
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

DetailPage.propTypes = {
    initialValues: PropTypes.object.isRequired,
    pageTitle: PropTypes.string.isRequired,
    updateAction: PropTypes.func.isRequired,
    createAction: PropTypes.func.isRequired,

};
export default DetailPage;