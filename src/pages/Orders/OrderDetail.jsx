import React from "react";
import {AutoComplete, Card, Col, Input, Row, Typography, Table, Button, Form, InputNumber} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {customerSelector, filterCustomer, selectCustomer} from "../../redux";
import {addProduct, filterProduct, productSelector, selectProduct} from "../../redux/ProductSlice";
import _ from "lodash";

const {Title} = Typography;

const OrderDetail = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const _customerSelector = useSelector(customerSelector);
    const _productSelector = useSelector(productSelector);

    const [form] = Form.useForm();

    //Constants
    const span = {span: 6};
    const readOnly = true;

    //#Map data
    //##Customer
    const __customers = _customerSelector ? _customerSelector.filteredItems : [];
    const viewCustomers = __customers.map(cus => ({
        label: `${cus.name} - ${cus.phone}`,
        value: `${cus.name} - ${cus.phone}`
    }));
    const customerSchema = _customerSelector.detailItem;

    //##Products
    const products = (!_productSelector.items.length == 0) ? _productSelector.items.map(iProduct => ({
        label: `${iProduct.name} - ${iProduct.codeName}`,
        value: `${iProduct.name} - ${iProduct.codeName}`
    })) : [];
    console.log('products', products);

    //Event Handler
    //Customers
    const handleCustomerSearch = (searchText) => {
        dispatch(filterCustomer(searchText))
    };

    const handleCustomerSelect = (value, option) => {
        dispatch(selectCustomer(value));
    };

    //Products
    const handleAddToProductList = () => {
        dispatch(addProduct());
    }

    const autocompleteFilterHandler = (inputValue, option) =>
        _.includes(option.value.toLowerCase(), inputValue.toLowerCase())

    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={4} style={{margin: 0}}>Thông tin đơn hàng</Title>
                </Col>
                <Col span={24}>
                    <Card
                        title={
                            // Search Customer Bar
                            <Row>
                                <Col md={8} xs={24}>
                                    <Title level={4}>Khách hàng</Title>
                                </Col>
                                <Col md={8} xs={24}>
                                    <AutoComplete
                                        onSearch={handleCustomerSearch}
                                        options={viewCustomers}
                                        onSelect={handleCustomerSelect}
                                        dropdownMatchSelectWidth={252}
                                    >
                                        <Input.Search size="large" placeholder="Nhập tên hoặc SĐT"
                                                      enterButton/>
                                    </AutoComplete>
                                </Col>
                            </Row>
                        }
                    >
                        {/*Customer Input*/}
                        <Row style={{paddingBottom: "1em"}}>
                            <Col span={24}>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={12}>
                                        <Row>
                                            <Col span={6}>
                                                <Typography.Text>Id</Typography.Text>
                                            </Col>
                                            <Col span={18}>
                                                <Input
                                                    value={customerSchema ? customerSchema.id : ''}
                                                    readOnly={true}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Row>
                                            <Col span={6}>
                                                <Typography.Text>Họ và tên</Typography.Text>
                                            </Col>
                                            <Col span={18}>
                                                <Input
                                                    value={customerSchema ? customerSchema.name : ''}
                                                    readOnly={true}/>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Row>
                                            <Col span={6}>
                                                <Typography.Text>Số Điện Thoại</Typography.Text>
                                            </Col>
                                            <Col span={18}>
                                                <Input
                                                    value={customerSchema ? customerSchema.phone : ''}
                                                    readOnly={true}/>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Row>
                                            <Col span={6}>
                                                <Typography.Text>Địa Chỉ</Typography.Text>
                                            </Col>
                                            <Col span={18}>
                                                <Input
                                                    value={customerSchema ? customerSchema.address : ''}
                                                    readOnly={true}/>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Row>
                                            <Col span={6}>
                                                <Typography.Text>Địa chỉ email</Typography.Text>
                                            </Col>
                                            <Col span={18}>
                                                <Input
                                                    value={customerSchema ? customerSchema.email : ''}
                                                    readOnly={true}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card
                        title={
                            //Search Product
                            <Row>
                                <Col md={8} xs={24}>
                                    <Title level={4}>Chi tiết đơn hàng</Title>
                                </Col>
                                <Col md={16} xs={24}>

                                </Col>
                            </Row>
                        }
                    >
                        <Row>
                            <Col span={24}>
                                <Form
                                    form={form}
                                    layout={{wrapperCol: {span: 8}}}
                                    onFinish={(values => {
                                        console.log('finish values', values);
                                    })}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={8}>
                                            <Form.Item
                                                name="product"
                                                wrapperCol={{span: 24}}
                                                rules={[
                                                    {
                                                        validator: (_, value) => {
                                                            const prod = products.find(item => item.value === value);
                                                            return prod ? Promise.resolve() : Promise.reject('Sản phẩm không hợp lệ')
                                                        }
                                                    },
                                                ]}
                                            >
                                                <AutoComplete
                                                    size="large"
                                                    filterOption={autocompleteFilterHandler}
                                                    options={products}
                                                    dropdownMatchSelectWidth={252}
                                                    size="large"
                                                    placeholder="Nhập tên hoặc mã sản phẩm"
                                                    notFoundContent="Không tìm thấy"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item name="quantity" wrapperCol={24}>
                                                <InputNumber
                                                    style={{width: "100%"}}
                                                    min={1}
                                                    max={10000}
                                                    size="large"
                                                    placeholder="Nhập số lượng"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item>
                                                <Button
                                                    htmlType="submit"
                                                    size="large"
                                                    type="primary"
                                                >
                                                    Thêm sản phẩm
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{marginTop: "1em"}}>
                                <Table></Table>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OrderDetail;
