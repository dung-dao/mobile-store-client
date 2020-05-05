import React from "react";
import { Button, Row, Space, Table } from "antd";
import { InfoOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Col } from "antd";
import AdvancedSearchForm from "./SearchForm";

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
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space>
        <Button shape="circle" type="primary" icon={<InfoOutlined />}></Button>
        <Button shape="circle" type="primary" icon={<EditOutlined />}></Button>
        <Button shape="circle" type="danger" icon={<DeleteOutlined />}></Button>
      </Space>
    ),
  },
];

const DataTable = () => {
  return (
    <React.Fragment>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AdvancedSearchForm
            fields={columns.map((e) => {
              return {
                label: e.title,
                name: e.key,
                placeholder: `Nhập ${e.title.toLowerCase()}`,
              };
            })}
          ></AdvancedSearchForm>
        </Col>
        <Col span={24}>
          <Table
            dataSource={dataSource}
            columns={columns}
            style={{ flexFlow: 1 }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DataTable;
