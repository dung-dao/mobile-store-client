import React from 'react';
import DataTable from "../../components/DataTable";

const ProductViewer = () => {
    return (
        <React.Fragment>
            <DataTable resourceName={'orders'} searchAC={null}></DataTable>
        </React.Fragment>
    );
};

export default ProductViewer;