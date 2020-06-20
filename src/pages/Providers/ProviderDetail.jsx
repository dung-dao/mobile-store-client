import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Card, Form, Input, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {createProvider, getProviderById, providerSelector, updateProvider} from "../../redux";
import {push} from 'connected-react-router';
import IF from "../../components/common/IF";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import LoadingPage from "../../components/common/LoadingPage";
import {numberValidate, r_viInputRule, requiredValidate} from "../../utils/validate";

const ProviderDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const {id} = useParams();
    const [form] = Form.useForm();

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
    const selector = useSelector(providerSelector);

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
                        form={form}
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
                            rules={r_viInputRule('tên nhà cung cấp')}
                        >
                            <Input readOnly={readOnly}/>
                        </Form.Item>
                        <Form.Item
                            label="Số Điện Thoại"
                            name="phone"
                            rules={[
                                ...requiredValidate('số điện thoại'),
                                ...numberValidate('số điện thoại')
                            ]}
                        >
                            <Input readOnly={readOnly}/>
                        </Form.Item>
                        <Form.Item
                            label="Địa Chỉ"
                            name="address"
                            rules={[
                                ...requiredValidate('Địa Chỉ'),
                            ]}
                        >
                            <Input readOnly={readOnly}/>
                        </Form.Item>
                        <IF condt={!readOnly}>
                            <Form.Item>
                                <Button
                                    htmlType="button"
                                    style={{marginRight: "1em"}}
                                    onClick={() => {
                                        form.resetFields()
                                    }}
                                >
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
