import React from 'react';
import DataTable from "../../components/common/DataTable";

const OrderList = () => {
    return (
        <React.Fragment>
            <DataTable resourceName={'orders'} searchAC={null}></DataTable>
        </React.Fragment>
    );
};

export default OrderList;