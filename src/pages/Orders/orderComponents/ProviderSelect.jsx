import React from 'react';
import {AutoComplete, Button, Col, Form, Row} from "antd";
import PropTypes from "prop-types";
import _ from "lodash";

const ProviderSelect = (props) => {
    const [form] = Form.useForm();
    const {providers, handleFinish} = props;
    const viewData = providers.map(customer => ({
        label: `${customer.name} - ${customer.phone}`,
        value: `${customer.name} - ${customer.phone}`
    }));

    //Local Handler
    const autocompleteFilterHandler = (inputValue, option) =>
        _.includes(option.value.toLowerCase(), inputValue.toLowerCase());

    return (
        <React.Fragment>
            <Form
                form={form}
                layout={{wrapperCol: {span: 8}}}
                onFinish={values => {
                    // console.log(values.selectData);
                    const phone = values.selectData.split(' - ')[1];
                    // console.log(phone);
                    const provider = providers.find(prov => prov.phone == phone);
                    // console.log(customer);
                    handleFinish(provider);
                }}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item
                            name="selectData"
                            wrapperCol={{span: 24}}
                            rules={[
                                {
                                    validator: (_, value) => {
                                        const prod = viewData.find(item => item.value === value);
                                        return prod ? Promise.resolve() : Promise.reject('Dữ liệu không hợp lệ')
                                    }
                                },
                            ]}
                        >
                            <AutoComplete
                                filterOption={autocompleteFilterHandler}
                                options={viewData}
                                dropdownMatchSelectWidth={252}
                                placeholder="Nhập tên hoặc số điện thoại"
                                notFoundContent="Không tìm thấy"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                            >
                                Chọn
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    );
};

ProviderSelect.propTypes = {
    providers: PropTypes.array.isRequired,
    handleFinish: PropTypes.func.isRequired
};

export default ProviderSelect;
