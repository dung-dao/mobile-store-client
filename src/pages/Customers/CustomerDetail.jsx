import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, Space, Row, Col} from 'antd';
import {useDispatch, useSelector} from "react-redux";
// import {createProvider, deleteProvider, login, providersSelector, updateProvider} from "../../redux";
import {useParams, useLocation} from 'react-router-dom';
import {push} from 'connected-react-router';
import IF from "../../components/common/IF";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import {numberRegex, vietnameseRegex} from "../../utils/validate";
import {createCustomer, getProviderById, providersSelector, searchCustomer, updateCustomer} from "../../redux";
import OrderViewer from "./OrderViewer";
import ContentPageLayout from "../../components/common/ContentPageLayout";
import CustomerInput from "../../components/FormInputs/CustomerInput";

const CustomerDetail = (props) => {
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

    // const dispatch = useDispatch();
    // const location = useLocation();
    // const action = location.state.action;
    //
    const back = () => {
        dispatch(push('/customers'));
    }
    //
    // //Config
    // const readOnly = action === "view";
    // const provider = location.state.payload;
    const provider = null;

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
                                <h3 style={{margin: 0}}>Thông tin khách hàng</h3>
                            </Space>
                        }>
                        <Form
                            initialValues={provider}
                            labelCol={{span: 8}}
                            labelAlign={"left"}
                            wrapperCol={{span: 16}}
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
                {/*<Col span={24}>*/}
                {/*    <Card title="Lịch sử đặt hàng">*/}
                {/*        <OrderViewer/>*/}
                {/*    </Card>*/}
                {/*</Col>*/}
            </Row>
        </React.Fragment>
    );
};

export default CustomerDetail;
