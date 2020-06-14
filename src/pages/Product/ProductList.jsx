import React, {useEffect, useState} from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {sort} from "../../utils/sort";
import PropTypes, {bool} from "prop-types";
import LoadingPage from "../../components/common/LoadingPage";
import {resourceName} from "./Config";
import {deleteProduct, productSelector, searchProduct} from "../../redux/ProductSlice";
import {mapNestedObject} from "../../utils/ObjectUtils";

const ProductList = (props) => {
    //Data Hook
    const dispatch = useDispatch();
    const selector = useSelector(productSelector);
    const products = selector['items'] ? selector['items'].map(item => {
        return mapNestedObject(item, [
            {key: 'manufactureName', path: ['manufacture', 'name']},
            {key: 'categoryName', path: ['category', 'name']},
        ])
    }) : [];
    console.log('products', products);

    if (selector.isFetching)
        return <LoadingPage/>

    return (
        <React.Fragment>
            <DataTable
                title="Danh sách sản phẩm"
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
                        title: "Đơn giá",
                        key: "amount",
                        dataIndex: "amount",
                        sorter: sort('amount')
                    },
                    {
                        title: "Hãng sản xuất",
                        key: "manufactureName",
                        dataIndex: "manufactureName",
                        sorter: sort('manufactureName')
                    },
                    {
                        title: "Danh mục",
                        key: "categoryName",
                        dataIndex: "categoryName",
                        sorter: sort('categoryName')
                    },
                ]}
                //id	name	codeName	description	madeIn	amount	createdAt	updatedAt	categoryId	manufactureId
                dataSource={products}
                resourceName={resourceName}
                deleteAC={deleteProduct}
                searchAC={searchProduct}
                disableFields={['amount', 'manufactureName', 'categoryName']}
            />
        </React.Fragment>
    );
};

ProductList.propTypes = {
    isToSelect: PropTypes.bool.isRequired
};

export default ProductList;
