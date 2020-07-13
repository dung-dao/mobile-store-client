import React, {useEffect, useRef, useState} from "react";
import {goBack} from 'connected-react-router';
import _ from "lodash";
import {useParams} from 'react-router-dom';
import {Button, Card, Col, Input, message, Row, Space, Table, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {customerSelector} from "../../../redux";
import {productSelector} from "../../../redux/ProductSlice";
import {sort} from "../../../utils/sort";
import ProductSelect from "../orderComponents/ProductSelect";
import CustomerSelect from "../orderComponents/CustomerSelect";
import {formatToCurrency} from "../../../utils/ObjectUtils";
import ModalConfirm from "../../../components/common/ModalConfirm";
import {createOrder} from "./OrderService";
import IF from "../../../components/common/IF";
import http from "../../../services/http";
import LoadingPage from "../../../components/common/LoadingPage";
import PrinterOutlined from "@ant-design/icons/lib/icons/PrinterOutlined";
import {useReactToPrint} from "react-to-print";

const {Title} = Typography;

const OrderDetail = (props) => {
    //Hooks
    const {id} = useParams();
    const dispatch = useDispatch();
    const [customer, setCustomer] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [author, setAuthor] = useState(null);
    const [buyedDate, setBuyedDate] = useState(new Date());

    const [init, setInit] = useState(false);
    const _customerSelector = useSelector(customerSelector);
    const _productSelector = useSelector(productSelector);
    const printRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        pageStyle: "padding: 3em"
    });

    //Handle view
    useEffect(() => {
        if (!(!id || init)) {
            setInit(true);
            http.get(`/orders/${id}`).then((res) => {
                const data = res.data;
                // console.log('data', data);

                //Customer
                const cus = {...data.Customer};
                setCustomer(cus);

                //Details
                const details = data.orderDetail.map(item => {
                    const obj = {
                        ...item.product,
                        quantity: item.quantity,
                        totalUnit: item.quantity * item.product.price
                    };
                    return obj;
                });
                setOrderDetails(details);
                setAuthor(data.user);
                setBuyedDate(new Date(data.createdAt));
            })

        }
    });

    //#Map data
    const customers = _customerSelector ? _customerSelector.items : [];
    const products = (!_productSelector.items.length == 0) ? _productSelector.items : [];

    //Event Handler
    //Select
    const handleSelectCustomer = (_customer) => {
        setCustomer(_customer);
    }
    const handleAddToProductList = (values) => {
        setOrderDetails([...orderDetails, values]);
    }

    const handleSubmit = async () => {
        setModalLoading(true);
        const request = {
            orderTypeId: 2,
            CustomerId: customer.id,
            orderDetail: orderDetails.map(item => ({
                quantity: item.quantity,
                productId: item.id
            }))
        };
        console.log(request);
        await createOrder(request);
        setModalLoading(false);
        message.success('Đã tạo đơn hàng');
        dispatch(goBack());
    }

    if (id && !init)
        return <LoadingPage/>

    return (
        <Row>
            <Col ref={printRef} span={24}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Row justify="space-between" align="middle">
                            <Col>
                                <Title level={3} style={{margin: 0}}>Thông tin đơn hàng</Title>
                            </Col>
                            <Col>
                                <Space>
                                    <Typography>Ngày mua hàng: </Typography>
                                    <Typography>{`${buyedDate.getDate()}/${buyedDate.getMonth()}/${buyedDate.getFullYear()}`}</Typography>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Card>
                            <Row>
                                <IF condt={!id}>
                                    <Col md={8} xs={24}>
                                        <Title level={4}>Khách hàng</Title>
                                    </Col>
                                </IF>
                                <IF condt={!id}>
                                    <Col md={16} xs={24}>
                                        <CustomerSelect
                                            customers={customers}
                                            handleFinish={handleSelectCustomer}
                                        />
                                    </Col>
                                </IF>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} md={12}>
                                            <Row>
                                                <Col span={6}>
                                                    <Typography.Text>Tên khách hàng</Typography.Text>
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
                                        <IF condt={id}>
                                            <Col xs={24} md={12}>
                                                <Row>
                                                    <Col span={6}>
                                                        <Typography.Text>Người bán hàng </Typography.Text>
                                                    </Col>
                                                    <Col span={18}>
                                                        <Input
                                                            value={author ? author.fullname : ''}
                                                            readOnly={true}/>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </IF>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card>
                            <Row>
                                <Col md={8} xs={24}>
                                    <Title level={4}>Chi tiết đơn hàng</Title>
                                </Col>
                            </Row>
                            <IF condt={!id}>
                                <Row>
                                    <Col span={24}>
                                        <ProductSelect products={products} handleFinish={handleAddToProductList}/>
                                    </Col>
                                </Row>
                            </IF>
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
                                                key: "price",
                                                dataIndex: "price",
                                                sorter: sort('price'),
                                                render: (text, record, index) => {
                                                    return formatToCurrency(text)
                                                }
                                            },
                                            {
                                                title: "Thành tiền",
                                                key: "totalUnit",
                                                dataIndex: "totalUnit",
                                                sorter: sort('totalUnit'),
                                                render: (text, record, index) => {
                                                    return formatToCurrency(text)
                                                }
                                            },

                                        ]}
                                        dataSource={orderDetails}
                                    />
                                </Col>
                            </Row>
                            <Row justify="end">
                                <Typography.Text style={{margin: "1em", fontWeight: "bold"}}>
                                    {`Tổng cộng: ${formatToCurrency(_.sum(orderDetails.map(item => item.totalUnit)))}`}
                                </Typography.Text>
                            </Row>
                            <IF condt={!id}>
                                <Row justify="end">
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => {
                                            setVisible(true);
                                        }}
                                        disabled={
                                            !customer || !orderDetails.length
                                        }
                                    >
                                        Tạo đơn hàng
                                    </Button>
                                    <ModalConfirm
                                        visible={visible}
                                        onOk={async () => {
                                            setVisible(false);
                                            await handleSubmit();
                                        }}
                                        onCancel={() => {
                                            setVisible(false);
                                        }
                                        }
                                        actionName="tạo đơn hàng"
                                        loading={modalLoading}
                                    />
                                </Row>
                            </IF>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row justify="end">
                    <Button onClick={handlePrint} style={{marginBottom: "1em", minWidth: "8em"}} type="primary">
                        In đơn hàng
                        <PrinterOutlined/>
                    </Button>
                </Row>
            </Col>
        </Row>
    );
};

export default OrderDetail;
