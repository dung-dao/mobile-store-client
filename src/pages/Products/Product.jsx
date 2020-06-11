import React, {useEffect, useState} from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
// import {customerSelector, deleteCustomer, searchCustomer} from "../../redux";
import {sort} from "../../utils/sort";
import {providersSelector, searchProvider} from "../../redux";
import LoadingPage from "../../components/common/LoadingPage";
import {productSelector, searchProduct} from "../../redux/productSlice";

const resourceName = 'products';

const Product = (props) => {
    //Data Hook
    const dispatch = useDispatch();
    const selector = useSelector(productSelector);
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init) {
            dispatch(searchProduct());
            setInit(true);
        }
    });

    if (selector.isFetching)
        return <LoadingPage/>

    return (
        <React.Fragment>
            <DataTable
                columns={[
                    {
                        title: "ID",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    },
                    {
                        title: "Tên sản phẩm",
                        key: "name",
                        dataIndex: "name",
                        sorter: sort('name')
                    },
                    {
                        title: "Tên mã",
                        key: "name",
                        dataIndex: "name",
                        sorter: sort('name')
                    },
                    {
                        title: "Giá",
                        key: "amount",
                        dataIndex: "amount",
                        sorter: sort('amount')
                    },
                    {
                        title: "Mô tả chi tiết",
                        key: "description",
                        dataIndex: "description",
                        sorter: sort('description')
                    }
                ]}
                // dataSource={selector[resourceName]}
                // resourceName={resourceName}
                // deleteAC={deleteCustomer}
                // searchAC={searchCustomer}
            />
        </React.Fragment>
    );
};

export default Product;
