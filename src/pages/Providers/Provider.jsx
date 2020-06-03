import React, {useEffect} from "react";
import DataTable from "../../components/DataTable";
import AppLayout from "../../layouts/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import {deleteProvider, providersSelector, searchProvider} from "../../redux";
import PropTypes from "prop-types";
import {sort} from "../../utils/sort";

const Provider = (props) => {
    const dispatch = useDispatch();
    const provider_selector = useSelector(providersSelector);
    useEffect(() => {
        if (!provider_selector.upToDate) {
            dispatch(searchProvider());
        }
    })
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
                        title: "Tên",
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
                ]}
                dataSource={provider_selector.providers}
                resourceName={"providers"}
                onDelete={deleteProvider}
                onSearch={(provider) => {
                    dispatch(searchProvider(provider));
                }}
            />
        </React.Fragment>
    );
};

export default Provider;
