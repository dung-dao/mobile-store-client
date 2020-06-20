import React, {Children, cloneElement, isValidElement} from 'react';
import PageHeader from "antd/es/page-header";
import PropTypes from "prop-types";
import {goBack} from 'connected-react-router';
import {useDispatch} from "react-redux";
import {Card} from "antd";

const FormLayout = (props) => {
    const dispatch = useDispatch();
    const childrenWithProps = Children.map(props.children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, {...props})
        }
        return child;
    });

    return (
        <Card style={{paddingTop: 0}}>
            <PageHeader
                className="site-page-header"
                onBack={() => {
                    dispatch(goBack())
                }}
                title={props.title}
                style={{paddingLeft: 0, paddingTop: 0}}
            >
                {childrenWithProps}
            </PageHeader>
        </Card>
    );
};

FormLayout.propTypes = {
    title: PropTypes.string.isRequired
};

export default FormLayout;
