import React from 'react';
import DataTable from "../../components/common/DataTable";
import {sort} from "../../utils/sort";

const OrderList = () => {
    return (
        <React.Fragment>
            <DataTable
                dataSource={[
                    {id: 'fasdfdas', name: 'fafdas', key:"1"},
                    {id: 'fasdfdas', name: 'fafdas', key:"2"},
                    {id: 'fasdfdas', name: 'fafdas', key:"3"},
                    {id: 'fasdfdas', name: 'fafdas', key:"4"},
                ]}
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
                ]}
                resourceName={'orders'}
                searchAC={null}/>
        </React.Fragment>
    );
};

export default OrderList;