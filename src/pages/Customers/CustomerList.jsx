import React, {useState} from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {customerSelector, deleteCustomer, searchCustomer} from "../../redux";
import {sort} from "../../utils/sort";
import PropTypes from "prop-types";
import LoadingPage from "../../components/common/LoadingPage";

const resourceName = 'customers';

const CustomerList = (props) => {
    //Data Hook
    const dispatch = useDispatch();
    const selector = useSelector(customerSelector);
    const [init, setInit] = useState(false);

    if (selector.isFetching)
        return <LoadingPage/>

    return (
        <React.Fragment>
            <DataTable
                title="Danh sách khách hàng"
                columns={[
                    {
                        title: "ID",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    },
                    {
                        title: "Tên khách hàng",
                        key: "name",
                        dataIndex: "name",
                        sorter: sort('name')
                    },
                    {
                        title: "Số điện thoại",
                        key: "phone",
                        dataIndex: "phone",
                        sorter: sort('phone')
                    },
                    {
                        title: "Địa chỉ",
                        key: "address",
                        dataIndex: "address",
                        sorter: sort('address')
                    },
                    {
                        title: "Email",
                        key: "email",
                        dataIndex: "email",
                        sorter: sort('email')
                    }
                ]}
                dataSource={selector['items']}
                resourceName={resourceName}
                deleteAC={deleteCustomer}
                searchAC={searchCustomer}
                onSearch={(values) => {
                    dispatch(searchCustomer(values))
                }}
                onReload={() => {
                    dispatch(searchCustomer())
                }}
            />
        </React.Fragment>
    );
};

CustomerList.propTypes = {
    isToSelect: PropTypes.bool.isRequired
};

export default CustomerList;
