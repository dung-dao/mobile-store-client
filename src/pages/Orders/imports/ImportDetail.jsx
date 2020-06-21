import React, {useEffect, useState} from "react";
import {goBack} from 'connected-react-router';
import _ from "lodash";
import {useParams} from 'react-router-dom';
import {Button, Card, Col, Input, message, Row, Table, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {providerSelector} from "../../../redux";
import {productSelector} from "../../../redux/ProductSlice";
import {sort} from "../../../utils/sort";
import ProductSelect from "../orderComponents/ProductSelect";
import {formatToCurrency} from "../../../utils/ObjectUtils";
import ModalConfirm from "../../../components/common/ModalConfirm";
import IF from "../../../components/common/IF";
import http from "../../../services/http";
import LoadingPage from "../../../components/common/LoadingPage";
import ProviderSelect from "../orderComponents/ProviderSelect";
import {createOrder} from "../orders/OrderService";

const {Title} = Typography;

const ImportDetail = (props) => {
    //Hooks
    const {id} = useParams();
    const dispatch = useDispatch();
    const [provider, setProvider] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [init, setInit] = useState(false);
    const _providerSelector = useSelector(providerSelector);
    const _productSelector = useSelector(productSelector);

    //Handle view
    //TODO: Edit use effect
    useEffect(() => {
        if (!(!id || init)) {
            setInit(true);
            http.get(`/orders/${id}`).then((res) => {
                const data = res.data;
                console.log('data', data);

                const prov = {...data.provider};
                setProvider(prov);

                //Details
                // console.log(data.orderDetail);
                const details = data.orderDetail.map(item => {
                    const obj = {
                        ...item.product,
                        quantity: item.quantity,
                        totalUnit: item.quantity * item.unitPrice
                    };
                    obj.price = item.unitPrice;
                    return obj;
                });
                // console.log(details);
                setOrderDetails(details);
            })

        }
    });

    //#Map data
    const providers = _providerSelector ? _providerSelector.providers : [];
    const products = (!_productSelector.items.length == 0) ? _productSelector.items : [];

    //Event Handler
    //Select
    const handleSelectProvider = (_provider) => {
        setProvider(_provider);
    }
    const handleAddToProductList = (values) => {
        setOrderDetails([...orderDetails, values]);
    }

    const handleSubmit = async () => {
        setModalLoading(true);
        const request = {
            orderTypeId: 1,
            providerId: provider.id,
            orderDetail: orderDetails.map(item => ({
                quantity: item.quantity,
                productId: item.id,
                unitPrice: item.price
            }))
        };
        console.log(request);
        await createOrder(request);
        setModalLoading(false);
        message.success('Đã tạo đơn nhập hàng');
        dispatch(goBack());
    }

    if (id && !init)
        return <LoadingPage/>

    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={3} style={{margin: 0}}>Thông tin nhập hàng</Title>
                </Col>
                <Col span={24}>
                    <Card>
                        <Row>
                            <Col md={8} xs={24}>
                                <Title level={4}>Nhà cung cấp</Title>
                            </Col>
                            <IF condt={!id}>
                                <Col md={16} xs={24}>
                                    <ProviderSelect
                                        providers={providers}
                                        handleFinish={handleSelectProvider}
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
                                                <Typography.Text>Id</Typography.Text>
                                            </Col>
                                            <Col span={18}>
                                                <Input
                                                    value={provider ? provider.id : ''}
                                                    readOnly={true}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Row>
                                            <Col span={6}>
                                                <Typography.Text>Tên nhà cung cấp</Typography.Text>
                                            </Col>
                                            <Col span={18}>
                                                <Input
                                                    value={provider ? provider.name : ''}
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
                                                    value={provider ? provider.phone : ''}
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
                                                    value={provider ? provider.address : ''}
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
                                                    value={provider ? provider.email : ''}
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
                    <Card>
                        <Row>
                            <Col md={8} xs={24}>
                                <Title level={4}>Chi tiết đơn hàng</Title>
                            </Col>
                        </Row>
                        <IF condt={!id}>
                            <Row>
                                <Col span={24}>
                                    <ProductSelect
                                        products={products}
                                        handleFinish={handleAddToProductList}
                                        inputPrice={true}
                                    />
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
                                        !provider || !orderDetails.length
                                    }
                                >
                                    Tạo đơn hàng
                                </Button>
                                <ModalConfirm
                                    visible={visible}
                                    onOk={async () => {
                                        // setVisible(false);
                                        await handleSubmit();

                                    }}
                                    onCancel={() => {
                                        setVisible(false);
                                    }
                                    }
                                    loading={modalLoading}
                                    actionName="tạo đơn hàng"
                                />
                            </Row>
                        </IF>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ImportDetail;
