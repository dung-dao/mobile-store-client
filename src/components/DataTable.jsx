import React from "react";
import PropTypes from 'prop-types';

import {Button, Row, Space, Table} from "antd";
import {InfoOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Col} from "antd";
import AdvancedSearchForm from "./SearchForm";
import {useDispatch} from "react-redux";
import {push} from 'connected-react-router';

const DataTable = (props) => {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <AdvancedSearchForm
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
                                        <Button shape="circle" type="primary" icon={<InfoOutlined/>}
                                                onClick={() => {
                                                    dispatch(
                                                        push(`/providers/${record.id}`, {action: "view"})
                                                    )
                                                }}/>
                                        <Button shape="circle" type="primary" icon={<EditOutlined/>}
                                                onClick={() => {
                                                    dispatch(
                                                        push(`/providers/${record.id}`, {action: "edit"})
                                                    )
                                                }}/>
                                        <Button shape="circle" type="danger" icon={<DeleteOutlined/>}
                                                onClick={() => {
                                                    //Delete
                                                }}/>
                                    </Space>
                                ),
                            },
                            ...props.columns
                        ]}
                        style={{flexFlow: 1}}
                        pagination={
                            {
                                defaultPageSize: 5,
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '20']
                            }
                        }
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            dataIndex: PropTypes.string,
            sorter: PropTypes.func //sort function return a - b
        })
    ).isRequired,
    dataSource: PropTypes.array.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
};

DataTable.defaultProps = {
    columns: [],
    dataSource: [],
    onCreate: function () {
        console.log('create')
    },
    onUpdate: function () {
        console.log('update')
    },
    onDelete: function () {
        console.log('delete')
    },
    onView: function () {
        console.log('view')
    }
};

export default DataTable;
