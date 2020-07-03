import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Row, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {goBack} from 'connected-react-router';
import LoadingPage from "../../components/common/LoadingPage";
import DetailPageLayout from "../../components/common/DetailPageLayout";
import {_createAC, _getByIdAC, _selector, _updateAC} from "./Config";
import IF from "../../components/common/IF";
import {createLabel} from "../../utils/ObjectUtils";
import {requiredValidate} from "../../utils/validate";

const CategoryDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const {id} = useParams();
    const [form] = Form.useForm();

    //Init data Hook
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init && id) {
            dispatch(_getByIdAC(id));
            setInit(true);
        }
    });

    //Get Params
    const {action} = props;
    const selector = useSelector(_selector);

    //Local variables
    const readOnly = action === "VIEW";
    if (!selector.isFetching)
        console.log(selector);

    const onFinish = (values) => {
        console.log('props', props);
        console.log('values', values);
        switch (action) {
            case "CREATE":
                dispatch(_createAC(values));
                break;
            case "UPDATE":
                dispatch(_updateAC(values));
                break;
            default:
                console.log('Unreachable code');
        }
        dispatch(goBack());
    }

    let detailItem = selector.detailItem;

    if (action !== 'CREATE' && !detailItem) {
        return <LoadingPage/>;
    }

    return (
        <DetailPageLayout title={createLabel(action, 'danh mục')}>
            <Form
                labelAlign={"left"}
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={detailItem}
            >
                <Row gutter={16}>
                    {(props.action !== "CREATE" ? <Col xs={24} md={12}>
                        <Form.Item
                            label="ID"
                            name="id"
                            labelAlign="left"
                        >
                            <Input readOnly={true}/>
                        </Form.Item>
                    </Col> : null)}
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Tên danh mục"
                            name="name"
                            labelAlign="left"
                            rules={[
                                ...requiredValidate("Tên danh mục"),
                            ]}
                        >
                            <Input readOnly={readOnly}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Mô tả chi tiết"
                            name="description"
                            rules={[
                                {max: 10000, message: 'Mô tả vượt quá độ dài cho phép'}
                            ]}
                        >
                            <Input.TextArea readOnly={readOnly}/>
                        </Form.Item>
                    </Col>
                </Row>
                <IF condt={!readOnly}>
                    <Row justify="end" style={{marginBottom: 0}}>
                        <Form.Item>
                            <Space style={{paddingLeft: "auto"}}>
                                <Button htmlType="button" onClick={() => {
                                    form.resetFields()
                                }}>
                                    Làm mới
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Lưu lại
                                </Button>
                            </Space>
                        </Form.Item>
                    </Row>
                </IF>
            </Form>
        </DetailPageLayout>
    );
};

export default CategoryDetail;
