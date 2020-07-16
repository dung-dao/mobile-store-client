import React from 'react';
import DataTable from "../../../components/common/DataTable";
import {sort} from "../../../utils/sort";
import {orderSelector, searchOrder} from "../../../redux/OrderSlice";
import {useDispatch, useSelector} from "react-redux";
import {formatToCurrency, mapNestedObject} from "../../../utils/ObjectUtils";
import PropTypes from "prop-types";
import LoadingPage from "../../../components/common/LoadingPage";

const ImportsList = (props) => {
    const {type} = props;
    const dispatch = useDispatch();

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

    let columns = [
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
            title: "Ngày nhập",
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
                resourceName={'imports'}
                searchAC={searchOrder}
                disableFields={['amount', 'createdAt']}
                title={props.title ? props.title : "Danh sách đơn nhập hàng"}
                disabledActions={{UPDATE: true, DELETE: true, SEARCH: true, ...props.disabledActions}}
                defaultSearchField="id"
                searchColumns={[
                    {
                        title: "Mã đơn hàng",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    }
                ]}
                onReload={() => dispatch(searchOrder({orderTypeId: 1}))}
                onSearch={(values) => dispatch(searchOrder({...values, orderTypeId: 1}))}
            />
        </React.Fragment>
    );
};

ImportsList.propTypes = {
    title: PropTypes.string,
    excludeColumns: PropTypes.array
};

export default ImportsList;
