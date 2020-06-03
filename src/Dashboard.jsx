import React from "react";
import AppLayout from "./layouts/AppLayout";
import IF from "./components/IF";
import DataTable from "./components/DataTable";
import {Button, Space} from "antd";
import {DeleteOutlined, EditOutlined, InfoOutlined} from "@ant-design/icons";
import {login} from "./redux";

const dataSource = [
    {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
    },
    {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
    {
        key: "3",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
    {
        key: "4",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
    {
        key: "5",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
    {
        key: "6",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
    {
        key: "7",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
    {
        key: "8",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
    {
        key: "9",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
    {
        key: "10",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
];

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        sorter: function (a, b) {
            return a > b;
        }
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },

];

const Dashboard = () => {
    return (
        <div>
            <React.Fragment>
                <IF condt={true}>
                    <DataTable columns={columns} dataSource={dataSource}/>
                </IF>
            </React.Fragment>
        </div>
    );
};

export default Dashboard;
