import React from 'react';
import DataTable from "../../../components/common/DataTable";
import {sort} from "../../../utils/sort";
import {orderSelector, searchOrder} from "../../../redux/OrderSlice";
import {useDispatch, useSelector} from "react-redux";
import {formatToCurrency, mapNestedObject} from "../../../utils/ObjectUtils";
import PropTypes from "prop-types";
import LoadingPage from "../../../components/common/LoadingPage";

const OrderList = (props) => {
    const dispatch = useDispatch();
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
    if (_orderSelector.isFetching)
        return <LoadingPage/>

    return (
        <React.Fragment>
            <DataTable
                dataSource={viewOrders}
                columns={columns}
                resourceName={'orders'}
                searchAC={searchOrder}
                disableFields={['amount', 'createdAt']}
                title={props.title ? props.title : "Danh sách đơn hàng"}
                disabledActions={{UPDATE: true, DELETE: true, SEARCH: false}}
                defaultSearchField="id"
                searchColumns={[
                    {
                        title: "Mã đơn hàng",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    }
                ]}
                onReload={() => dispatch(searchOrder({orderTypeId: 2}))}
                onSearch={(values) => dispatch(searchOrder({orderTypeId: 2, ...values}))}
            />
        </React.Fragment>
    );
};

OrderList.propTypes = {
    title: PropTypes.string,
    excludeColumns: PropTypes.array
};

export default OrderList;
