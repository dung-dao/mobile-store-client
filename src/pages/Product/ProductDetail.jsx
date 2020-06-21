import React, {useEffect, useState} from 'react';
import {Button, Form, Row, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {goBack} from 'connected-react-router';
import LoadingPage from "../../components/common/LoadingPage";
import DetailPageLayout from "../../components/common/DetailPageLayout";
import {_createAC, _getByIdAC, _selector, _updateAC} from "./Config";
import ProductInputs from "../../components/FormInputs/ProductInputs";
import IF from "../../components/common/IF";
import {createLabel} from "../../utils/ObjectUtils";

const ProductDetail = (props) => {
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
        <DetailPageLayout title={createLabel(action, 'sản phẩm')}>
            <Form
                initialValues={action === 'CREATE' ? {manufactureId: 1, categoryId: 1} : detailItem}
                labelCol={{span: 8}}
                labelAlign={"left"}
                wrapperCol={{span: 16}}
                form={form}
                onFinish={
                    values => {
                        console.log(values)
                    }
                }
            >
                <Row gutter={16}>
                    <ProductInputs span={12} readOnly={readOnly} action={action}/>
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

export default ProductDetail;
