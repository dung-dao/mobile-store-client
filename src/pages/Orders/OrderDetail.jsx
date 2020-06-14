import React, {useEffect, useState} from "react";
import {AutoComplete, Card, Col, Divider, Form, Input, Row, Typography, Table, Select} from 'antd';
import CustomerInputs from "../../components/FormInputs/CustomerInputs";
import {useDispatch, useSelector} from "react-redux";
import {customerSelector, filterCustomer, selectCustomer} from "../../redux";
import {numberRegex, vietnameseRegex} from "../../utils/validate";

const {Title} = Typography;

const OrderDetail = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(customerSelector);
    let customers = selector ? selector.filteredItems : [];
    const viewCustomers = customers.map(cus => ({
        label: `${cus.name} - ${cus.phone}`,
        value: `${cus.name} - ${cus.phone}`
    }));
    const span = {span: 6};
    const readOnly = true;
    const customerSchema = selector.detailItem;
    console.log(customerSchema);
    // console.log('test', viewCustomers);
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
                                        onSearch={searchText => {
                                            dispatch(filterCustomer(searchText))
                                        }}
                                        options={
                                            // [
                                            //     {label: 'fuck', value: 12},
                                            //     {label: 'fuckf', value: 13},
                                            //     {label: 'fuckfdsa', value: 1},
                                            //     {label: 'fuckfasd', value: 19}
                                            // ]
                                            viewCustomers
                                        }
                                        onSelect={(value, option) => {
                                            dispatch(selectCustomer(value));
                                        }}
                                        dropdownMatchSelectWidth={252}
                                    >
                                        <Input.Search size="large" placeholder="input here" enterButton/>
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
                                                    // value={100}
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
                                                    // value={100}
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
                                                    // value={100}
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
                                                    // value={100}
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
                                                    // value={100}
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
                                <Col md={8} xs={24}>
                                    <Input.Search placeholder="Nhập tên hoặc mã sản phẩm"/>
                                </Col>
                            </Row>
                        }
                    >
                        <Row>
                            <Col span={24} style={{marginTop: "1em"}}>
                                <Table/>
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OrderDetail;
