import React, {useEffect} from 'react';
import DataTable from "../../../components/common/DataTable";
import {sort} from "../../../utils/sort";
import {orderSelector, searchOrder} from "../../../redux/OrderSlice";
import {useSelector} from "react-redux";
import {formatToCurrency, mapNestedObject} from "../../../utils/ObjectUtils";
import PropTypes from "prop-types";

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

    let columns = [
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
            sorter: sort('amount'),
            render: (text, record, index) => {
                return formatToCurrency(text)
            }
        },
    ];

    columns = columns.filter(item => !props.excludeColumns || !props.excludeColumns.find(e => e === item.dataIndex));

    return (
        <React.Fragment>
            <DataTable
                dataSource={viewOrders}
                columns={columns}
                resourceName={'orders'}
                searchAC={searchOrder}
                disableFields={['amount', 'createdAt']}
                title={props.title ? props.title : "Danh sách đơn hàng"}
                disableSearchBar={true}
                disabledActions={{UPDATE: true, DELETE: true, SEARCH: true, ...props.disabledActions}}
            />
        </React.Fragment>
    );
};

OrderList.propTypes = {
    title: PropTypes.string,
    excludeColumns: PropTypes.array
};

export default OrderList;
