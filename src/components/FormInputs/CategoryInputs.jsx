import React from 'react';
import {Col, Form, Input, Row} from "antd";
import IF from "../common/IF";
import {requiredValidate} from "../../utils/validate";
import PropTypes from "prop-types";

const CategoryInputs = (props) => {
    const span = {span: 6};
    const readOnly = props.action === 'VIEW';
    return (
        <React.Fragment>
            <Row gutter={16}>

            </Row>
        </React.Fragment>
    );
};

CategoryInputs.propTypes = {
    initialValues: PropTypes.object,
    action: PropTypes.string.isRequired,
};

export default CategoryInputs;
