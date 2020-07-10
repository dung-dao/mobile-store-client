import React from 'react';
import {Button, Col, Form, Input, Row, Select} from "antd";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import PropTypes from "prop-types";
import {requiredValidate} from "../../utils/validate";

const SearchBar = (props) => {
    const searchFields = props.columns.map(col => {
        return {name: col.dataIndex, label: col.title};
    });

    function mapSearchVal(values) {
        const option = {};
        option[values.searchField] = values.searchVal;
        return option;
    }

    return (<React.Fragment>
        <Form
            onFinish={values => {
                props.onFinish(mapSearchVal(values));
            }}
        >
            <Row>
                <Col span={20}>
                    <Form.Item>
                        <Input.Group compact>
                            <Form.Item
                                name="searchField"
                                rules={[...requiredValidate('Trường tìm kiếm')]}
                                noStyle
                            >
                                <Select placeholder="Trường tìm kiếm" style={{width: '40%'}}>
                                    {
                                        searchFields.map(item => {
                                            return <Select.Option key={Math.random()} value={item.name}>
                                                {item.label}
                                            </Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                noStyle
                                name="searchVal"
                            >
                                <Input style={{width: '60%'}} placeholder="Nhập nội dung tìm kiếm"/>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Button htmlType="submit" type="primary">
                        <SearchOutlined/>
                    </Button>
                </Col>
            </Row>
        </Form>
    </React.Fragment>);
};

SearchBar.propTypes = {
    onFinish: PropTypes.func.isRequired,
    columns: PropTypes.array
};
export default SearchBar;
