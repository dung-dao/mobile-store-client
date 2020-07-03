import React, {useState} from "react";
import {Button, Col, Form, Input, Row, Space} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import IF from "./IF";
import {useDispatch} from "react-redux";

const AdvancedSearchForm = (props) => {
    const dispatch = useDispatch();
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();
    const {searchAC} = props;

    const getFields = () => {
        const disableFields = props.disableFields;

        const count = expand ? 10 : 6;
        let children = props.fields
            .filter((e) => e.name !== "id" && disableFields ? !disableFields.find(item => item === e.name) : true)
            .map((field, index) => (
                <Col span={8} key={index}>
                    <Form.Item
                        name={field.name}
                        label={field.label}
                    >
                        <Input maxLength={1000} placeholder={field.placeholder}/>
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
        // console.log(values);
        dispatch(searchAC(values));
    };

    const fields = getFields();
    return (
        <div style={{backgroundColor: "white", paddingLeft: "1.5em", paddingTop: "1.5em", paddingRight: "1.5em"}}>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    {fields}
                    <Col span={8}>
                        <Row justify="end">
                            <Space style={{marginBottom: "1em"}}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Tìm kiếm
                                </Button>
                                <IF condt={props.fields.length - (props.disableFields ? props.disableFields.length : 0) > 2}>
                                    <Button
                                        style={{fontSize: "1em"}}
                                        onClick={() => {
                                            setExpand(!expand);
                                        }}
                                    >
                                        {expand ? <React.Fragment>
                                            <UpOutlined/> Ẩn bớt
                                        </React.Fragment> : <React.Fragment>
                                            <DownOutlined/> Hiện tất cả
                                        </React.Fragment>}
                                    </Button>
                                </IF>
                            </Space>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

AdvancedSearchForm.propTypes = {
    resourceName: PropTypes.string.isRequired,
    searchAC: PropTypes.func.isRequired,
    disableFields: PropTypes.array,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            placeholder: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default AdvancedSearchForm;
