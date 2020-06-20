import React from 'react';
import {AutoComplete, Button, Form, Select} from "antd";
import _ from 'lodash';

const TestPage = () => {
    const options = [
        {label: 'test1', value: 'test1'},
        {label: 'test2', value: 'test2'},
        {label: 'test21', value: 'test21'},
        {label: 'test3', value: 'test3'},
        {label: 'test4', value: 'test4'},
        {label: 'test5', value: 'test5'},

    ];
    const handleSearch = () => {

    };

    return (
        <div>
            <Form onFinish={values => {
                console.log(values)
            }}>
                <Form.Item name="ok">
                    <AutoComplete
                        filterOption={
                            (inputValue, option) =>
                                _.includes(option.value.toLowerCase(), inputValue.toLowerCase())
                        }
                        options={options}/>
                </Form.Item>
                <Form.Item>
                    {/*<MAutoComplete options={options}/>*/}
                </Form.Item>
                <Form.Item>
                    <Select options={options}/>
                </Form.Item>
                <Button htmlType="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default TestPage;
