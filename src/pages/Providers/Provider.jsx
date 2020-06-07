import React from "react";
import DataTable from "../../components/DataTable";
import {useSelector} from "react-redux";
import {deleteProvider, providersSelector, searchProvider} from "../../redux";
import {sort} from "../../utils/sort";

const Provider = (props) => {
    const selector = useSelector(providersSelector);
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
                dataSource={selector.providers}
                resourceName={"providers"}
                deleteAC={deleteProvider}
                searchAC={searchProvider}
            />
        </React.Fragment>
    );
};

export default Provider;
