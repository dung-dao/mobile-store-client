import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, Space, Row, Col} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams, useLocation} from 'react-router-dom';
import {push} from 'connected-react-router';
import IF from "../../components/common/IF";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import LoadingPage from "../../components/common/LoadingPage";
import {allUsersSelector, createUser, getUserById, updateUser} from "../../redux/allUsersSlice";
import UserInput from "../../components/FormInputs/UserInput";

const UserDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const {id} = useParams();

    //Init data Hook
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init && id) {
            dispatch(getUserById(id));
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

    const back = () => {
        dispatch(push('/users'));
    }

    const onFinish = (values) => {
        console.log('values', values);
        // switch (action) {
        //     case "CREATE":
        //         dispatch(createUser(values));
        //         back();
        //         break;
        //     case "UPDATE":
        //         dispatch(updateUser(values));
        //         back();
        //         break;
        //     default:
        //         console.log('Unreachable code');
        // }
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
                                <h3 style={{margin: 0}}>Thông tin khách hàng</h3>
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
                                <UserInput span={12} readOnly={readOnly} action={action}/>
                            </Row>
                            <Row justify="end" style={{marginBottom: 0}}>
                                <IF condt={action !== "VIEW"}>
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
            </Row>
        </React.Fragment>
    );
};

export default UserDetail;
