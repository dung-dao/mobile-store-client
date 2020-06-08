import React from "react";
import {AutoComplete, Card, Col, Divider, Form, Input, Row, Typography, Table} from 'antd';
import CustomerInputs from "../../components/forms/CustomerInputs";

const {Title} = Typography;

const OrderDetail = (props) => {

    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={3} style={{margin: 0}}>Đơn hàng</Title>
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
                                    <Input.Search placeholder="Nhập tên hoặc số điện thoại"/>
                                </Col>
                            </Row>
                        }
                    >

                        {/*Customer Input*/}
                        <Row style={{paddingBottom: "1em"}}>
                            <Col span={24}>
                                <Form>
                                    <AutoComplete>
                                        <CustomerInputs action="INPUT"></CustomerInputs>
                                    </AutoComplete>
                                </Form>
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
