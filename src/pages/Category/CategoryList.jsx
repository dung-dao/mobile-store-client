import React from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {sort} from "../../utils/sort";
import PropTypes from "prop-types";
import LoadingPage from "../../components/common/LoadingPage";
import {resourceName} from "./Config";
import {searchProduct} from "../../redux/ProductSlice";
import {Col, Row, Select, Space, Typography} from 'antd';
import {categorySelector, deleteCategory, searchCategory} from "../../redux/CategorySlice";

const {Title} = Typography;

const TableTitle = () => {
    const dispatch = useDispatch();
    const _selector = useSelector(categorySelector);
    const categories = _selector?.items.map(item => ({
        label: item.name,
        value: item.id
    }));
    return <Space align="baseline" size="large">
        <Title level={4}>Danh mục</Title>
        <Select
            style={{minWidth: "10em"}}
            defaultValue={1}
            onChange={(value, option) => {
                dispatch(searchProduct({categoryId: value}))
                // alert(value);
            }}
        >
            {categories.map(element => (
                <Select.Option key={element.value} value={element.value}>{element.label}</Select.Option>))}
        </Select>
    </Space>
};

const CategoryList = (props) => {
    //Data Hook
    const dispatch = useDispatch();
    const selector = useSelector(categorySelector);
    const data = selector['items'] ? selector['items'] : [];

    return (
        <Row gutter={[16, 16]}>
            <Col span={24} style={{minHeight: "100%"}}>
                {!selector.isFetching ?
                    <DataTable
                        title="Danh sách các danh mục"
                        columns={[
                            {
                                title: "ID",
                                key: "id",
                                dataIndex: "id",
                                sorter: sort('id')
                            },
                            {
                                title: "Tên danh mục",
                                key: "name",
                                dataIndex: "name",
                                sorter: sort('name')
                            },
                            {
                                title: "Mô tả chi tiết",
                                key: "description",
                                dataIndex: "description",
                                sorter: sort('description')
                            },
                        ]}
                        dataSource={data}
                        resourceName={resourceName}
                        deleteAC={deleteCategory}
                        searchAC={searchCategory}
                        disableFields={['amount', 'manufactureName', 'categoryName']}
                    /> : <LoadingPage/>}
            </Col>
        </Row>);
};

CategoryList.propTypes = {
    isToSelect: PropTypes.bool.isRequired
};

export default CategoryList;
