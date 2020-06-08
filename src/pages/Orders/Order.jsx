import React from "react";
import {Card, Form} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import CustomerInputs from "../../components/forms/CustomerInputs";
import Search from "antd/es/input/Search";
import CustomerList from "../Customers/CustomerList";

const resourceName = 'orders';

const Order = (props) => {
    return (
        <React.Fragment>
            <Card>
                <CustomerList isToSelect={true}/>
            </Card>
        </React.Fragment>
    );
};

export default Order;
