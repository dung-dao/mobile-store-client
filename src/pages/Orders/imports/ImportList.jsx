import React, {useEffect} from 'react';
import DataTable from "../../../components/common/DataTable";
import {sort} from "../../../utils/sort";
import {orderSelector, searchOrder} from "../../../redux/OrderSlice";
import {useSelector} from "react-redux";
import {mapNestedObject} from "../../../utils/ObjectUtils";

const ImportsList = (props) => {
    const {type} = props;

    const _orderSelector = useSelector(orderSelector);
    const rawOrders = _orderSelector.items.length ? _orderSelector.items : [];
    const viewOrders = rawOrders.map(order => {
        const val = mapNestedObject(
            order,
            [
                {key: 'name', path: ['provider', 'name']},
                {key: 'phone', path: ['provider', 'phone']},
            ],
            ['Customer', 'provider', 'providerId', 'orderTypeId', 'updatedAt']
        );
        const date = new Date(val.createdAt);
        val.createdAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        return val;
    });

    useEffect(() => {
        console.log(viewOrders);
    });


    return (
        <React.Fragment>
            <DataTable
                dataSource={viewOrders}
                columns={[
                    {
                        title: "Mã nhập hàng",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    },
                    {
                        title: "Tên nhà cung cấp",
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
                        title: "Ngày nhập",
                        key: "createdAt",
                        dataIndex: "createdAt",
                        sorter: sort('createdAt')
                    },
                    {
                        title: "Giá trị đơn hàng",
                        key: "amount",
                        dataIndex: "amount",
                        sorter: sort('amount')
                    },
                ]}
                resourceName={'imports'}
                searchAC={searchOrder}
                disableFields={['amount', 'createdAt']}
                title={type === 'ORDER' ? "Danh sách đơn hàng" : "Danh sách nhập hàng"}
                disableSearchBar={true}
                disableEdit={true}
            />
        </React.Fragment>
    );
};

export default ImportsList;
