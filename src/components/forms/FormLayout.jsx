import React, {useState} from 'react';
import {Button, Col, Form, Input, PageHeader, Row} from "antd";
import PropTypes from "prop-types";
import {createProvider, searchProvider, updateProvider} from "../../redux";
import {push} from "connected-react-router";
import IF from "../common/IF";

const FormLayout = () => {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <PageHeader title={"Chi Tiet"}/>
                </Col>
                <Col span={24}>
                    <Form
                        labelCol={{span: 4}}
                        labelAlign={"left"}
                        wrapperCol={{span: 12}}
                        onFinish={(values) => {

                        }}
                    >

                    </Form>
                </Col>
            </Row>
        </div>
    );
};

FormLayout.propTypes = {
    resourceName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updateAC: PropTypes.func.isRequired,
    searchAC: PropTypes.func.isRequired,
    createAC: PropTypes.func.isRequired,
};

export default FormLayout;