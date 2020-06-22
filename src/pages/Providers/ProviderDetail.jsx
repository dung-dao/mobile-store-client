import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Col, Form, Input, Row, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {createProvider, getProviderById, providerSelector, updateProvider} from "../../redux";
import {push} from 'connected-react-router';
import IF from "../../components/common/IF";
import LoadingPage from "../../components/common/LoadingPage";
import {numberValidate, r_viInputRule, requiredValidate, phoneValidate} from "../../utils/validate";
import DetailPageLayout from "../../components/common/DetailPageLayout";
import {createLabel} from "../../utils/ObjectUtils";
import ImportsList from "../Orders/imports/ImportList";
import {searchOrder} from "../../redux/OrderSlice";

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
            dispatch(searchOrder({orderTypeId: 1, providerId: id}));
            setInit(true);
        }
    });

    //Get Params
    const {action} = props;
    const selector = useSelector(providerSelector);

    //Local variables
    const readOnly = action === "VIEW";

    if (selector.isFetching)
        return <LoadingPage/>

    return <Row gutter={[16, 16]}>
        <Col span={24}>
            <DetailPageLayout title={createLabel(action, 'nhà cung cấp')}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form
                            initialValues={action !== "CREATE" && selector.currentProvider}
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
                                    ...phoneValidate('số điện thoại')
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
                                <Form.Item wrapperCol={{span: 16}}>
                                    <Row justify="end">
                                        <Space>
                                            <Button
                                                htmlType="button"
                                                onClick={() => {
                                                    form.resetFields()
                                                }}
                                            >
                                                Làm mới
                                            </Button>
                                            <Button type="primary" htmlType="submit">
                                                Lưu lại
                                            </Button>
                                        </Space>
                                    </Row>
                                </Form.Item>
                            </IF>
                        </Form>
                    </Col>
                </Row>
            </DetailPageLayout>
        </Col>
        <IF condt={action === 'VIEW'}>
            <Col span={24}>
                <ImportsList
                    disabledActions={{CREATE: true}}
                    title="Lịch sử nhập hàng"
                />
            </Col>
        </IF>
    </Row>
};

export default ProviderDetail;
