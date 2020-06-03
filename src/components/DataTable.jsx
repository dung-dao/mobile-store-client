import React from "react";
import PropTypes from "prop-types";

import { Button, Popconfirm, Row, Space, Table } from "antd";
import { InfoOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Col } from "antd";
import AdvancedSearchForm from "./SearchForm";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { deleteProvider } from "../redux";

const DataTable = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AdvancedSearchForm
            resourceName={props.resourceName}
            onSearch={props.onSearch}
            fields={props.columns.map((e) => {
              return {
                label: e.title,
                name: e.key,
                placeholder: `Nhập ${e.title.toLowerCase()}`,
              };
            })}
          />
        </Col>
        <Col span={24}>
          <Table
            dataSource={props.dataSource}
            columns={[
              {
                title: "Thao Tác",
                key: "action",
                render: (record) => (
                  <Space>
                    <Button
                      shape="circle"
                      type="primary"
                      icon={<InfoOutlined />}
                      onClick={() => {
                        dispatch(
                          push(`/${props.resourceName}/${record.id}`, {
                            action: "view",
                            payload: record,
                          })
                        );
                      }}
                    />
                    <Button
                      shape="circle"
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => {
                        dispatch(
                          push(`/${props.resourceName}/${record.id}`, {
                            action: "edit",
                            payload: record,
                          })
                        );
                      }}
                    />
                    <Popconfirm
                      title={"Bạn có chắc muốn xóa?"}
                      onConfirm={() => {
                        dispatch(props.onDelete(record));
                      }}
                    >
                      <Button
                        shape="circle"
                        type="danger"
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  </Space>
                ),
              },
              ...props.columns,
            ]}
            style={{ flexFlow: 1 }}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

DataTable.propTypes = {
  resourceName: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      dataIndex: PropTypes.string,
      sorter: PropTypes.func, //sort function return a - b
    })
  ).isRequired,
  dataSource: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSearch:PropTypes.func.isRequired
};

DataTable.defaultProps = {
  columns: [],
  dataSource: [],
  onCreate: function () {
    console.log("create");
  },
  onUpdate: function () {
    console.log("update");
  },
  onDelete: function () {
    console.log("delete");
  },
  onView: function () {
    console.log("view");
  },
};

export default DataTable;
