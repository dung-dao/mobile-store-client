import React from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {customerSelector, deleteCustomer, searchCustomer} from "../../redux";
import {sort} from "../../utils/sort";
import PropTypes, {bool} from "prop-types";
import CustomerInputs from "../../components/forms/CustomerInputs";

const resourceName = 'customers';

const CustomerList = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(customerSelector);
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
                dataSource={selector[resourceName]}
                resourceName={resourceName}
                deleteAC={deleteCustomer}
                searchAC={searchCustomer}
                selectHandler={() => {

                }}
            />
        </React.Fragment>
    );
};

CustomerList.propTypes = {
    isToSelect: PropTypes.bool.isRequired
};

export default CustomerList;
