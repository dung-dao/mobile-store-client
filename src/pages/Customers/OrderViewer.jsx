import React from 'react';
import DataTable from "../../components/DataTable";

const OrderViewer = () => {
    return (
        <React.Fragment>
            <DataTable resourceName={'orders'} searchAC={null}></DataTable>
        </React.Fragment>
    );
};

export default OrderViewer;