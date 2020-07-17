import React, {useEffect, useState} from 'react';
import {goBack} from 'connected-react-router';
import {Button, Card, Col, Form, Row, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import IF from "../../components/common/IF";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import {createCustomer, customerSelector, getCustomerById, updateCustomer,} from "../../redux";
import CustomerInput from "../../components/FormInputs/CustomerInput";
import LoadingPage from "../../components/common/LoadingPage";
import OrderList from "../Orders/orders/OrderList";
import {searchOrder} from "../../redux/OrderSlice";
import {createLabel} from "../../utils/ObjectUtils";

const CustomerDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const {id} = useParams();

    //Init data Hook
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init && id) {
            dispatch(getCustomerById(id));
            dispatch(searchOrder({orderTypeId: 2, CustomerId: id}));
            setInit(true);
        }
    });

    //Get Params
    const {action} = props;
    const selector = useSelector(customerSelector);

    //Local variables
    const readOnly = action === "VIEW";

    const back = () => {
        dispatch(goBack());
    }

    const onFinish = (values) => {
        switch (action) {
            case "CREATE":
                dispatch(createCustomer(values));
                back();
                break;
            case "UPDATE":
                dispatch(updateCustomer(values));
                back();
                break;
            default:
                console.log('Unreachable code');

        }
    }

    const detailItem = selector.detailItem;

    if (action !== 'CREATE' && !detailItem) {
        console.log(action);
        return <LoadingPage/>;
    }

    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title={
                            <Space align={"center"}>
                                <Button
                                    shape="circle-outline"
                                    onClick={back}
                                >
                                    <ArrowLeftOutlined/>
                                </Button>
                                <h3 style={{margin: 0}}>{createLabel(action, 'khách hàng')}</h3>
                            </Space>
                        }>
                        <Form
                            initialValues={detailItem}
                            labelCol={{span: 8}}
                            labelAlign={"left"}
                            wrapperCol={{span: 16}}
                            onFinish={values => onFinish(values)}
                        >
                            <Row gutter={16}>
                                <CustomerInput span={12} readOnly={readOnly} action={action}/>
                            </Row>
                            <Row justify="end" style={{marginBottom: 0}}>
                                <IF condt={action !== "view"}>
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
                                </IF>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                {action === 'VIEW' ? <Col span={24}>
                    <OrderList
                        title="Lịch sử mua hàng"
                        excludeColumns={[
                            'name',
                            'phone'
                        ]}
                        disabledActions={{CREATE: true}}
                    />
                </Col> : null}
            </Row>
        </React.Fragment>
    );
};

export default CustomerDetail;
