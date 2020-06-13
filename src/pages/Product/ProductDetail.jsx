import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, Space, Row, Col} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {goBack} from 'connected-react-router';
import LoadingPage from "../../components/common/LoadingPage";
import {allUsersSelector, createUser, getUserById, updateUser} from "../../redux/AllUsersSlice";
import FormLayout from "../../components/common/FormLayout";
import UserRegisterInput from "../../components/FormInputs/UserRegisterInput";
import {createAC, detailPageTitle, getByIdAC, updateAC} from "./Config";

const ProductDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const {id} = useParams();

    //Init data Hook
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init && id) {
            dispatch(getByIdAC(id));
            setInit(true);
        }
    });

    //Get Params
    const {action} = props;
    const selector = useSelector(allUsersSelector);

    //Local variables
    const readOnly = action === "VIEW";
    if (!selector.isFetching)
        console.log(selector);

    const onFinish = (values) => {
        console.log('props', props);
        console.log('values', values);
        switch (action) {
            case "CREATE":
                dispatch(createAC(values));
                break;
            case "UPDATE":
                dispatch(updateAC(values));
                break;
            default:
                console.log('Unreachable code');
        }
        dispatch(goBack());
    }

    const detailItem = selector.detailItem;

    if (action !== 'CREATE' && !detailItem) {
        console.log(action);
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
                    <UserRegisterInput span={12} readOnly={readOnly} action={action}/>
                </Row>
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
            </Form>
        </FormLayout>
    );

    // return (
    //     <React.Fragment>
    //         <Row gutter={[16, 16]}>
    //             <Col span={24}>
    //                 <Card
    //                     title={
    //                         <Space align={"center"}>
    //                             <Button
    //                                 shape="circle-outline"
    //                                 onClick={back}
    //                             >
    //                                 <ArrowLeftOutlined/>
    //                             </Button>
    //                             <h3 style={{margin: 0}}>Thông tin khách hàng</h3>
    //                         </Space>
    //                     }>
    //                     <Form
    //                         initialValues={detailItem}
    //                         labelCol={{span: 8}}
    //                         labelAlign={"left"}
    //                         wrapperCol={{span: 16}}
    //                         onFinish={values => onFinish(values)}
    //                     >
    //                         <Row gutter={16}>
    //                             <UserInput span={12} readOnly={readOnly} action={action}/>
    //                         </Row>
    //                         <Row justify="end" style={{marginBottom: 0}}>
    //                             <IF condt={action !== "VIEW"}>
    //                                 <Form.Item>
    //                                     <Space style={{paddingLeft: "auto"}}>
    //                                         <Button htmlType="button">
    //                                             Làm mới
    //                                         </Button>
    //                                         <Button type="primary" htmlType="submit">
    //                                             Lưu lại
    //                                         </Button>
    //                                     </Space>
    //                                 </Form.Item>
    //                             </IF>
    //                         </Row>
    //                     </Form>
    //                 </Card>
    //             </Col>
    //         </Row>
    //     </React.Fragment>
    // );
};

export default ProductDetail;
