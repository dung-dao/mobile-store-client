import React, {useState} from "react";
import _ from "lodash";
import {Card, Col, Input, Row, Typography, Table, Button, Form, InputNumber} from 'antd';
import {useSelector} from "react-redux";
import {customerSelector} from "../../redux";
import {productSelector} from "../../redux/ProductSlice";
import {sort} from "../../utils/sort";
import ProductSelect from "./ProductSelect";
import CustomerSelect from "./CustomerSelect";

const {Title} = Typography;

const OrderDetail = (props) => {
    //State
    const [customer, setCustomer] = useState(null);
    const [orderDetails, setOrderdetails] = useState([]);

    //Hooks
    const _customerSelector = useSelector(customerSelector);
    const _productSelector = useSelector(productSelector);

    //#Map data
    const customers = _customerSelector ? _customerSelector.items : [];
    const products = (!_productSelector.items.length == 0) ? _productSelector.items : [];

    //Event Handler
    //Customers
    const handleSelectCustomer = (_customer) => {
        console.log('values', _customer);
        setCustomer(_customer);
    }

    //Products
    const handleAddToProductList = (values) => {
        setOrderdetails([...orderDetails, values]);
    }
    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={3} style={{margin: 0}}>Thông tin đơn hàng</Title>
                </Col>
                <Col span={24}>
                    <Card
                        title={
                            // Customer Bar @Customer
                            <Row>
                                <Col md={8} xs={24}>
                                    <Title level={4}>Khách hàng</Title>
                                </Col>
                                <Col md={16} xs={24}>
                                    <CustomerSelect
                                        customers={customers}
                                        handleFinish={handleSelectCustomer}
                                    />
                                </Col>
                            </Row>
                        }
                    >
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
                                                    value={customer ? customer.id : ''}
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
                                                    value={customer ? customer.name : ''}
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
                                                    value={customer ? customer.phone : ''}
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
                                                    value={customer ? customer.address : ''}
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
                                                    value={customer ? customer.email : ''}
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
                                <ProductSelect products={products} handleFinish={handleAddToProductList}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{marginTop: "1em"}}>
                                <Table
                                    pagination={false}
                                    columns={[
                                        {
                                            title: "Tên mã",
                                            key: "codeName",
                                            dataIndex: "codeName",
                                            sorter: sort('codeName')
                                        },
                                        {
                                            title: "Tên sản phẩm",
                                            key: "name",
                                            dataIndex: "name",
                                            sorter: sort('name')
                                        },
                                        {
                                            title: "Số lượng",
                                            key: "quantity",
                                            dataIndex: "quantity",
                                            sorter: sort('quantity')
                                        },
                                        {
                                            title: "Đơn giá",
                                            key: "amount",
                                            dataIndex: "amount",
                                            sorter: sort('amount')
                                        },
                                        {
                                            title: "Thành tiền",
                                            key: "totalUnit",
                                            dataIndex: "totalUnit",
                                            sorter: sort('totalUnit')
                                        },

                                    ]}
                                    dataSource={orderDetails}
                                />
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Typography.Text style={{margin: "1em", fontWeight: "bold"}}>
                                {`Tổng cộng: ${_.sum(orderDetails.map(item => item.totalUnit))}`}
                            </Typography.Text>
                        </Row>
                        <Row justify="end">
                            <Button type="primary" size="large">Tạo đơn hàng</Button>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OrderDetail;
