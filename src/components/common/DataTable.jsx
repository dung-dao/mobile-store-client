import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import PropTypes from "prop-types";
import {Button, Popconfirm, Row, Space, Table, Typography, Col, Card} from "antd";
import {InfoOutlined, EditOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

import AdvancedSearchForm from "./SearchForm";
import IF from "./IF";

const {Title} = Typography;

const DataTable = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <AdvancedSearchForm
                            disableFields={props.disableFields}
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
                    <Col span={24}>
                        <Card>
                            <Row>
                                <Col span={24}>
                                    <Row justify="space-between">
                                        <Col>
                                            {typeof props.title === "string" ?
                                                <Title level={4}>{props.title}</Title> : props.title}
                                        </Col>
                                        <Col>
                                            <Row justify="end">
                                                <Col>
                                                    <Space>
                                                        <IF condt={!!selectedItem}>
                                                            <Space>
                                                                <Button
                                                                    type="primary"
                                                                    icon={<InfoOutlined/>}
                                                                    onClick={() => {
                                                                        dispatch(push(`/${props.resourceName}/${selectedItem.id}`));
                                                                    }}
                                                                >Chi tiết</Button>
                                                                <Button
                                                                    type="primary"
                                                                    icon={<EditOutlined/>}
                                                                    onClick={() => {
                                                                        dispatch(
                                                                            push(`/${props.resourceName}/${selectedItem.id}/update`));
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
                                                        </IF>
                                                        <Button
                                                            type="primary"
                                                            icon={<PlusOutlined/>}
                                                            onClick={() => {
                                                                dispatch(
                                                                    push(`/${props.resourceName}/create`, {
                                                                        action: "ADD"
                                                                    })
                                                                );
                                                            }}
                                                        >Thêm mới</Button>
                                                    </Space>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row>
                                        <Col span={24}>
                                            <Table
                                                locale={{emptyText: 'Chưa có dữ liệu'}}
                                                showSorterTooltip={false}
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
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

DataTable.propTypes = {
    resourceName: PropTypes.string.isRequired,
    title: PropTypes.any.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            dataIndex: PropTypes.string,
            sorter: PropTypes.func, //sort function return a - b
        })
    ).isRequired,
    disableFields: PropTypes.array,
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
