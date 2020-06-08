import React, {useState} from "react";
import {Form, Row, Col, Input, Button, Space, Card} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import IF from "./IF";
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import RedoOutlined from "@ant-design/icons/lib/icons/RedoOutlined";
import Tooltip from "antd/es/tooltip";
import {Link} from "react-router-dom";

const AdvancedSearchForm = (props) => {
    const dispatch = useDispatch();
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();

    const getFields = () => {
        const count = expand ? 10 : 6;
        let children = props.fields
            .filter((e) => e.name !== "action" && e.name !== "id")
            .map((field, index) => (
                <Col span={8} key={index}>
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
        if (expand) {
            if (children.length % 3 === 1) {
                children.push(<Col span={8}/>);
            } else if (children.length % 3 === 0) {
                children.push(<React.Fragment>
                    <Col span={8}/>
                    <Col span={8}/>
                </React.Fragment>)
            }
            return children;
        } else
            return children.slice(0, 2);
    };

    const onFinish = (values) => {
        dispatch(props.searchAC(values));
    };

    const fields = getFields();
    return (
        <Card>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    {/*Search Fields*/}
                    {fields}
                    <Col span={8}>
                        <Row justify={expand ? "end" : "start"}>
                            <Space style={{marginBottom: "1em"}}>
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
                                <Link
                                    style={{fontSize: 12}}
                                    onClick={() => {
                                        setExpand(!expand);
                                    }}
                                >
                                    {expand ? <React.Fragment>
                                        <UpOutlined/> Ẩn bớt
                                    </React.Fragment> : <React.Fragment>
                                        <DownOutlined/> Hiện tất cả
                                    </React.Fragment>}
                                </Link>
                            </Space>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Card>
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
