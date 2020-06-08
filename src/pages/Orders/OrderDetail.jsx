import React from 'react';
import DataTable from "../../components/common/DataTable";

const OrderDetail = () => {
    return (
        <React.Fragment>
            <DataTable resourceName={'orders'} searchAC={null}></DataTable>
        </React.Fragment>
    );
};

export default OrderDetail;