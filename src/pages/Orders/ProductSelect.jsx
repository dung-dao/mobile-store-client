import React from 'react';
import {AutoComplete, Button, Col, Form, InputNumber, Row} from "antd";
import PropTypes from "prop-types";
import _ from "lodash";

const ProductSelect = (props) => {
    const [form] = Form.useForm();
    const {products, handleFinish} = props;
    const autoProducts = products.map(iProduct => ({
        label: `${iProduct.name} - ${iProduct.codeName}`,
        value: `${iProduct.name} - ${iProduct.codeName}`
    }));

    //Local Handler
    const autocompleteFilterHandler = (inputValue, option) =>
        _.includes(option.value.toLowerCase(), inputValue.toLowerCase());

    return (
        <div>
            <Form
                form={form}
                layout={{wrapperCol: {span: 8}}}
                onFinish={values => {
                    // console.log('values', values);
                    const codeName = values.product.split(' - ')[1];
                    const product = products.find(prod => prod.codeName == codeName);
                    handleFinish({...product, quantity: values.quantity, totalUnit: product.amount * values.quantity});
                }}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item
                            name="product"
                            wrapperCol={{span: 24}}
                            rules={[
                                {
                                    validator: (_, value) => {
                                        const prod = autoProducts.find(item => item.value === value);
                                        return prod ? Promise.resolve() : Promise.reject('Sản phẩm không hợp lệ')
                                    }
                                },
                            ]}
                        >
                            {/*@Product*/}
                            <AutoComplete
                                filterOption={autocompleteFilterHandler}
                                options={autoProducts}
                                dropdownMatchSelectWidth={252}
                                placeholder="Nhập tên hoặc mã sản phẩm"
                                notFoundContent="Không tìm thấy"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="quantity" wrapperCol={24}>
                            <InputNumber
                                style={{width: "100%"}}
                                min={1}
                                max={10000}
                                placeholder="Nhập số lượng"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                            >
                                Thêm sản phẩm
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

ProductSelect.propTypes = {
    products: PropTypes.array.isRequired,
    handleFinish: PropTypes.func.isRequired
};

export default ProductSelect;
