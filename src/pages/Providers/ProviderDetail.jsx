import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Form, Input, Button, Card, Space, Spin, Row} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {
    createProvider,
    deleteProvider,
    getProviderById,
    login,
    providersSelector,
    searchProvider,
    updateProvider
} from "../../redux";
import {push} from 'connected-react-router';
import IF from "../../components/common/IF";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import Col from "antd/es/grid/col";
import LoadingPage from "../../components/common/LoadingPage";

const ProviderDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const {id} = useParams();

    //Init data Hook
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init && id) {
            dispatch(getProviderById(id));
            setInit(true);
        }
    });

    //Get Params
    const {action} = props;
    const selector = useSelector(providersSelector);

    //Local variables
    const readOnly = action === "VIEW";
    if (!selector.isFetching)
        console.log(selector);

    return (
        <React.Fragment>
            <Card
                title={
                    <Space align={"center"}>
                        <Button
                            shape={"circle"}
                            onClick={
                                () => {
                                    dispatch(push('/providers'));
                                }
                            }
                        >
                            <ArrowLeftOutlined/>
                        </Button>
                        <h3 style={{margin: 0}}>Chi Tiết Nhà Cung Cấp</h3>
                    </Space>
                }>
                <IF condt={selector.isFetching}>
                    <LoadingPage/>
                </IF>
                <IF condt={!selector.isFetching}>
                    <Form
                        initialValues={selector.currentProvider}
                        labelCol={{span: 4}}
                        labelAlign={"left"}
                        wrapperCol={{span: 12}}
                        onFinish={(values) => {
                            switch (action) {
                                case "UPDATE":
                                    dispatch(updateProvider(values));
                                    break;
                                case  "CREATE":
                                    dispatch(createProvider(values));
                                    break;
                                default:
                                    console.log('Provider detail unreachable code');
                            }
                            dispatch(push('/providers'));
                        }}
                    >
                        <IF condt={action !== 'CREATE'}>
                            <Form.Item
                                label="ID"
                                name="id"
                            >
                                <Input readOnly={true}/>
                            </Form.Item>
                        </IF>

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
                        <IF condt={!readOnly}>
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
                </IF>
            </Card>
        </React.Fragment>
    );
};

export default ProviderDetail;