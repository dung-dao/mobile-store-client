import React, {useEffect, useState} from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {sort} from "../../utils/sort";
import PropTypes, {bool} from "prop-types";
import LoadingPage from "../../components/common/LoadingPage";
import {resourceName} from "./Config";
import {deleteProduct, productSelector, searchProduct} from "../../redux/ProductSlice";

const ProductList = (props) => {
    //Data Hook
    const dispatch = useDispatch();
    const selector = useSelector(productSelector);

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
                        key: "manufactureId",
                        dataIndex: "manufactureId",
                        sorter: sort('manufactureId')
                    },
                ]}
                //id	name	codeName	description	madeIn	amount	createdAt	updatedAt	categoryId	manufactureId
                dataSource={selector['items']}
                resourceName={resourceName}
                deleteAC={deleteProduct}
                searchAC={searchProduct}
            />
        </React.Fragment>
    );
};

ProductList.propTypes = {
    isToSelect: PropTypes.bool.isRequired
};

export default ProductList;
