import React, {useEffect, useState} from 'react';
import {Button, Form, Row, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {goBack} from 'connected-react-router';
import LoadingPage from "../../components/common/LoadingPage";
import FormLayout from "../../components/common/FormLayout";
import {_createAC, _getByIdAC, _selector, _updateAC, detailPageTitle} from "./Config";
import ProductInputs from "../../components/FormInputs/ProductInputs";
import IF from "../../components/common/IF";

const ProductDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const {id} = useParams();

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

    const detailItem = selector.detailItem;

    if (action !== 'CREATE' && !detailItem) {
        return <LoadingPage/>;
    }

    return (
        <FormLayout title={detailPageTitle}>
            <Form
                initialValues={detailItem}
                labelCol={{span: 8}}
                labelAlign={"left"}
                wrapperCol={{span: 16}}
                onFinish={values => onFinish(values)}
            >
                <Row gutter={16}>
                    <ProductInputs span={12} readOnly={readOnly} action={action}/>
                </Row>
                <IF condt={!readOnly}>
                    <Row justify="end" style={{marginBottom: 0}}>
                        <Form.Item>
                            <Space style={{paddingLeft: "auto"}}>
                                <Button htmlType="button">
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
        </FormLayout>
    );
};

export default ProductDetail;
