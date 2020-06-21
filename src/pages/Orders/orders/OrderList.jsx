import React, {useEffect} from 'react';
import DataTable from "../../../components/common/DataTable";
import {sort} from "../../../utils/sort";
import {orderSelector, searchOrder} from "../../../redux/OrderSlice";
import {useSelector} from "react-redux";
import {mapNestedObject} from "../../../utils/ObjectUtils";

const OrderList = (props) => {
    const _orderSelector = useSelector(orderSelector);
    const rawOrders = _orderSelector.items.length ? _orderSelector.items : [];
    const viewOrders = rawOrders.map(order => {
        const val = mapNestedObject(
            order,
            [
                {key: 'name', path: ['Customer', 'name']},
                {key: 'phone', path: ['Customer', 'phone']},
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
                        title: "Mã đơn hàng",
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
                        title: "Ngày mua hàng",
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
                resourceName={'orders'}
                searchAC={searchOrder}
                disableFields={['amount', 'createdAt']}
                title={"Danh sách đơn hàng"}
                disableSearchBar={true}
                disableEdit={true}
            />
        </React.Fragment>
    );
};

export default OrderList;
