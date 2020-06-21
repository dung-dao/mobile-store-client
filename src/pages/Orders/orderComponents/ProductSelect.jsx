import React from 'react';
import {AutoComplete, Button, Col, Form, InputNumber, Row} from "antd";
import PropTypes from "prop-types";
import _ from "lodash";
import IF from "../../../components/common/IF";
import {formatToCurrency} from "../../../utils/ObjectUtils";

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
                initialValues={{quantity: 1}}
                onFinish={values => {
                    // console.log('values', values);
                    const codeName = values.product.split(' - ')[1];
                    const product = products.find(prod => prod.codeName == codeName);
                    const obj = {
                        ...product,
                        quantity: values.quantity,
                        totalUnit: values.unitPrice * values.quantity
                    };
                    obj.price = values.unitPrice;
                    if (!obj.price) {
                        obj.price = product.price;
                        obj.totalUnit = obj.price * obj.quantity;
                    }

                    handleFinish(obj);
                    form.resetFields();
                }}>
                <Row gutter={[16, 16]} align="bottom">
                    <Col span={8}>
                        <Form.Item
                            name="product"
                            label="Tên sản phẩm"
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
                            <AutoComplete
                                filterOption={autocompleteFilterHandler}
                                options={autoProducts}
                                dropdownMatchSelectWidth={252}
                                placeholder="Nhập tên hoặc mã sản phẩm"
                                notFoundContent="Không tìm thấy"
                            />
                        </Form.Item>
                    </Col>

                    <IF condt={props.inputPrice}>
                        <Col span={4}>
                            <Form.Item
                                name="unitPrice"
                                wrapperCol={24}
                                label="Đơn giá"
                            >
                                <InputNumber
                                    style={{width: "100%"}}
                                    min={1}
                                    max={10000000000}
                                    step={1000000}
                                    placeholder="Nhập đơn giá"
                                    formatter={value => formatToCurrency(value)}
                                    parser={(value) => Number(value.replace(/[^0-9-]+/g, ""))}
                                />
                            </Form.Item>
                        </Col>
                    </IF>

                    <Col span={4}>
                        <Form.Item label="Số lượng" name="quantity" wrapperCol={24}>
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
    handleFinish: PropTypes.func.isRequired,
    inputPrice: PropTypes.bool
};

export default ProductSelect;
