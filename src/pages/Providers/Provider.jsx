import React, {useEffect, useState} from "react";
import DataTable from "../../components/DataTable";
import AppLayout from "../../layouts/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import {providersSelector, searchProvider} from "../../redux";
import PropTypes from "prop-types";

const Provider = (props) => {
    const [init, setInit] = useState(false);
    const dispatch = useDispatch();
    const provider_selector = useSelector(providersSelector);
    return (
        <AppLayout>
            <DataTable
                columns={[
                    {
                        title: "ID",
                        key: "id",
                        dataIndex: "id",
                    },
                    {
                        title: "Tên",
                        key: "name",
                        dataIndex: "name",
                    },
                    {
                        title: "Số điện thoại",
                        key: "phone",
                        dataIndex: "phone",
                    },
                    {
                        title: "Địa chỉ",
                        key: "address",
                        dataIndex: "address",
                    },
                ]}
                dataSource={provider_selector.providers}
            />
        </AppLayout>
    );
};

export default Provider;
