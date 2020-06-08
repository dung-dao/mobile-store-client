import React, {useState} from "react";
import {Form, Row, Col, Input, Button, Space} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import IF from "./IF";
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import RedoOutlined from "@ant-design/icons/lib/icons/RedoOutlined";
import Tooltip from "antd/es/tooltip";

const AdvancedSearchForm = (props) => {
    const dispatch = useDispatch();
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();

    const getFields = () => {
        const count = expand ? 10 : 6;
        let children = [];
        if (expand) {
            children = props.fields
                .filter((e) => e.name !== "action" && e.name !== "id")
                .map((field, index) => (
                    <Col span={6} key={index}>
                        <Form.Item
                            name={field.name}
                            label={field.label}
                            rules={[
                                {
                                    message: "Input something!",
                                },
                            ]}
                        >
                            <Input placeholder={field.placeholder}/>
                        </Form.Item>
                    </Col>
                ));
        }
        return children;
    };

    const onFinish = (values) => {
        dispatch(props.searchAC(values));
    };

    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row>
                <Col
                    span={24}
                    style={{
                        textAlign: "left",
                    }}
                >
                    <Space style={{marginBottom: "1em"}}>
                        <Tooltip title="Tải lại dữ liệu">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<RedoOutlined/>}
                                onClick={() => {
                                    dispatch(props.searchAC())
                                }}
                            />
                        </Tooltip>
                        <Button
                            type="primary"
                            onClick={() => {
                                dispatch(
                                    push(
                                        `/${props.resourceName}/create`,
                                        {action: "create"}
                                    )
                                )
                            }}
                        >
                            Thêm mới
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={(event) => {
                                if (!expand) {
                                    event.preventDefault();
                                    setExpand(true);
                                }
                            }}>
                            Tìm kiếm
                        </Button>
                        <IF condt={expand}>
                            <a
                                style={{fontSize: 12}}
                                onClick={() => {
                                    setExpand(!expand);
                                }}
                            >
                                {<UpOutlined/>} Ẩn tìm kiếm
                            </a>
                        </IF>
                    </Space>
                </Col>
            </Row>
            <Row gutter={24}>{getFields()}</Row>
        </Form>
    );
};

AdvancedSearchForm.propTypes = {
    resourceName: PropTypes.string.isRequired,
    searchAC: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            placeholder: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default AdvancedSearchForm;
