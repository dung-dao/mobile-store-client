import React from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {sort} from "../../utils/sort";
import PropTypes from "prop-types";
import LoadingPage from "../../components/common/LoadingPage";
import {resourceName} from "./Config";
import {deleteProduct, productSelector, searchProduct} from "../../redux/ProductSlice";
import {formatToCurrency, mapNestedObject} from "../../utils/ObjectUtils";
import {Col, Row, Select, Space, Typography} from 'antd';
import {categorySelector} from "../../redux/CategorySlice";
import {userSelector} from "../../redux";

const {Title} = Typography;

const CategorySelect = () => {
    const dispatch = useDispatch();
    const _selector = useSelector(categorySelector);

    const categories = _selector?.items.map(item => ({
        label: item.name,
        value: item.id
    }));

    return <Space align="baseline" size="large">
        <Typography>Danh mục:</Typography>
        <Select
            style={{minWidth: "10em"}}
            defaultValue={1}
            onChange={(value, option) => {
                dispatch(searchProduct({categoryId: value}))
            }}
        >
            {categories.map(element => (
                <Select.Option key={element.value} value={element.value}>{element.label}</Select.Option>))}
        </Select>
    </Space>
};

const ProductList = (props) => {
    //Data Hook
    const dispatch = useDispatch();
    const selector = useSelector(productSelector);
    const _user = useSelector(userSelector);
    const _categories = useSelector(categorySelector);

    console.log(_categories?.items);
    const products = (selector['items'] ? selector['items'].map(item => {
        return mapNestedObject(item, [
            {key: 'manufactureName', path: ['manufacture', 'name']},
            {key: 'categoryName', path: ['category', 'name']},
        ])
    }) : []).map(item => {
        const res = {...item};
        if (!res.available) {
            res.available = 0;
        }
        return res;
    });

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Row justify="space-between" align="middle">
                    <Typography.Title level={4}>
                        Sản phẩm
                    </Typography.Title>
                    <CategorySelect/>
                </Row>
            </Col>
            <Col span={24} style={{minHeight: "100%"}}>
                {!selector.isFetching ?
                    <DataTable
                        title="Danh sách sản phẩm"
                        columns={[
                            {
                                title: "Mã sản phẩm",
                                key: "id",
                                dataIndex: "id",
                                sorter: sort('id')
                            },
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
                                title: "Giá bán",
                                key: "price",
                                dataIndex: "price",
                                sorter: sort('price'),
                                render: (text, record, index) => {
                                    return formatToCurrency(text)
                                }
                            },
                            {
                                title: "Giá vốn",
                                key: "COGS",
                                dataIndex: "COGS",
                                sorter: sort('price'),
                                render: (text, record, index) => {
                                    return formatToCurrency(text)
                                }
                            },
                            {
                                title: "Hãng sản xuất",
                                key: "manufactureName",
                                dataIndex: "manufactureName",
                                sorter: sort('manufactureName')
                            },
                            {
                                title: "Còn tồn",
                                key: "available",
                                dataIndex: "available",
                                sorter: sort('available')
                            },
                        ]}
                        searchColumns={[
                            {
                                title: "Mã sản phẩm",
                                key: "id",
                                dataIndex: "id",
                            },
                            {
                                title: "Tên mã",
                                key: "codeName",
                                dataIndex: "codeName",
                            },
                            {
                                title: "Tên sản phẩm",
                                key: "name",
                                dataIndex: "name",
                            }
                        ]}
                        dataSource={products}
                        resourceName={resourceName}
                        deleteAC={deleteProduct}
                        disableFields={['amount', 'manufactureName', 'categoryName']}
                        defaultSearchField="name"
                        disabledActions={{
                            CREATE: _user?.user?.role !== 'admin',
                            UPDATE: _user?.user?.role !== 'admin',
                            DELETE: _user?.user?.role !== 'admin'
                        }}
                        onSearch={(values) => {
                            dispatch(searchProduct(values));
                        }}
                        onReload={() => dispatch(searchProduct())}
                    /> : <LoadingPage/>}
            </Col>
        </Row>);
};

ProductList.propTypes = {
    isToSelect: PropTypes.bool.isRequired
};

export default ProductList;
