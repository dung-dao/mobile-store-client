import React from 'react';
import {Button, Form, Row, Space} from 'antd';
import {useDispatch} from "react-redux";
import {goBack} from 'connected-react-router';
import UserRegisterInput from "../../components/FormInputs/UserRegisterInput";
import FormLayout from "../../components/common/FormLayout";
import {createUser} from "../../redux/AllUsersSlice";

const UserRegister = (props) => {
    //Hooks
    const dispatch = useDispatch();

    //Get Params
    const {action} = props;

    //Local variables
    const readOnly = false;

    const back = () => {
        dispatch(goBack());
    }

    const onFinish = (values) => {
        console.log('props', props);
        console.log('values', values);
        switch (action) {
            case "CREATE":
                dispatch(createUser(values));
                break;
            // case "UPDATE":
            //     dispatch(updateUser(values));
            //     back();
            //     break;
            default:
                console.log('Unreachable code');
        }
        back();
    }

    return (
        <FormLayout title="Đăng ký tài khoản">
            <Form
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
};

export default UserRegister;
