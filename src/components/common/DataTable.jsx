import React, {useState} from "react";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {Button, Card, Col, Dropdown, Menu, Modal, Popconfirm, Row, Space, Table, Typography} from "antd";
import {push} from 'connected-react-router';
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import SearchBar from "./SearchBar";
import ReloadOutlined from "@ant-design/icons/lib/icons/ReloadOutlined";

const {Title} = Typography;
const {confirm} = Modal;

const DataTable = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();

    const menu = (
        <Menu style={{minWidth: "8em"}}>
            <Menu.Item
                onClick={() => {
                    dispatch(push(`/${props.resourceName}/${selectedItem.id}`));
                }}
                disabled={(!selectedItem || props.disabledActions && props.disabledActions.VIEW)}
            >
                <Row align="middle" justify="space-between">
                    Chi tiết
                    <InfoCircleOutlined/>
                </Row>
            </Menu.Item>
            <Menu.Item
                onClick={() => {
                    dispatch(push(`/${props.resourceName}/create`))
                }}
            >
                <Row align="middle" justify="space-between">
                    Tạo
                    <PlusCircleOutlined/>
                </Row>
            </Menu.Item>
            <Menu.Item
                danger={selectedItem}
                onClick={() => {
                    confirm({
                        title: 'Cảnh báo',
                        icon: <ExclamationCircleOutlined/>,
                        content: 'Bạn có chắc chắn muốn xóa?',
                        okText: "Đồng ý",
                        cancelText: "Hủy",
                        onOk() {
                            dispatch(props.deleteAC(selectedItem))
                        }
                    })
                }}
                disabled={!selectedItem || props.disabledActions && props.disabledActions.DELETE}
            >
                <Row align="middle" justify="space-between">
                    <Popconfirm
                        title={"Bạn có chắc muốn xóa?"}
                        onConfirm={() => {
                            dispatch(props.deleteAC(selectedItem));
                        }}
                    >
                        Xóa
                    </Popconfirm>
                    <DeleteOutlined/>
                </Row>
            </Menu.Item>
            <Menu.Item
                disabled={!selectedItem || props.disabledActions && props.disabledActions.UPDATE}
                onClick={() => {
                    dispatch(push(`/${props.resourceName}/${selectedItem.id}/update`))
                }}
            >
                <Row align="middle" justify="space-between">
                    Sửa
                    <EditOutlined/>
                </Row>
            </Menu.Item>
        </Menu>
    );

    return (
        <React.Fragment>
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card>
                            <Row>
                                <Col md={8} sm={24}>
                                    {typeof props.title === "string" ?
                                        <Typography.Title
                                            level={4}>{props.title}</Typography.Title> : props.title}
                                </Col>
                                <Col md={12} sm={24}>
                                    <SearchBar onFinish={props.onSearch} columns={props.columns}/>
                                </Col>
                                <Col md={4} sm={24}>
                                    <Row justify="end">
                                        <Space>
                                            <Dropdown overlay={menu}>
                                                <Button
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    Thao tác
                                                    <MenuOutlined/>
                                                </Button>
                                            </Dropdown>
                                            <Button onClick={props.onReload}>
                                                <ReloadOutlined/>
                                            </Button>
                                        </Space>
                                    </Row>
                                </Col>
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
    onSearch: PropTypes.func,
    onReload: PropTypes.func.isRequired,
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
    disableSearchBar: PropTypes.bool,
    disableEdit: PropTypes.bool,
    disabledActions: PropTypes.shape({
        CREATE: PropTypes.bool,
        UPDATE: PropTypes.bool,
        DELETE: PropTypes.bool,
        VIEW: PropTypes.bool,
        SEARCH: PropTypes.bool
    }),
    customActions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            onClick: PropTypes.func.isRequired
        })
    )
};

export default DataTable;
