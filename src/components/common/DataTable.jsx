import React, {useState} from "react";
import PropTypes from "prop-types";

import {Button, Popconfirm, Row, Space, Table} from "antd";
import {InfoOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Col} from "antd";
import AdvancedSearchForm from "./SearchForm";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import IF from "./IF";

const DataTable = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <AdvancedSearchForm
                        resourceName={props.resourceName}
                        searchAC={props.searchAC}
                        fields={props.columns.map((e) => {
                            return {
                                label: e.title,
                                name: e.key,
                                placeholder: `Nhập ${e.title.toLowerCase()}`,
                            };
                        })}
                    />
                </Col>
                <IF condt={selectedItem}>
                    <Col span={24}>
                        <Row justify="end">
                            <Col>
                                <Space>
                                    <Button
                                        type="primary"
                                        icon={<InfoOutlined/>}
                                        onClick={() => {
                                            dispatch(
                                                push(`/${props.resourceName}/${selectedItem.id}`, {
                                                    action: "view",
                                                    payload: selectedItem,
                                                })
                                            );
                                        }}
                                    >Chi tiết</Button>
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined/>}
                                        onClick={() => {
                                            dispatch(
                                                push(`/${props.resourceName}/${selectedItem.id}`, {
                                                    action: "edit",
                                                    payload: selectedItem,
                                                })
                                            );
                                        }}
                                    >Chỉnh sửa</Button>
                                    <Popconfirm
                                        title={"Bạn có chắc muốn xóa?"}
                                        onConfirm={() => {
                                            dispatch(props.deleteAC(selectedItem));
                                        }}
                                    >
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined/>}
                                        >
                                            Xóa
                                        </Button>
                                    </Popconfirm>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </IF>
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                            <Table
                                rowSelection={{
                                    type: "radio",
                                    onChange: (selectedRowKeys, selectedRows) => {
                                        console.log('selectedRows: ', selectedRows);
                                        setSelectedItem({...selectedRows[0]});
                                    }
                                }}
                                dataSource={props.dataSource}
                                columns={props.columns ? props.columns : []}
                                style={{flexFlow: 1}}
                                pagination={{
                                    defaultPageSize: 5,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["5", "10", "20"],
                                }}
                            />
                        </Col>
                    </Row>
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
    deleteAC: PropTypes.func.isRequired,
    searchAC: PropTypes.func.isRequired,
    selectHandler: PropTypes.func,
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
    deleteAC: function () {
        console.log("delete");
    },
    onView: function () {
        console.log("view");
    },
};

export default DataTable;
