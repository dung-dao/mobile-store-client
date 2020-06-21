import React from 'react';
import PageHeader from "antd/es/page-header";
import PropTypes from "prop-types";
import {goBack} from 'connected-react-router';
import {useDispatch} from "react-redux";
import {Card} from "antd";

const DetailPageLayout = (props) => {
    const dispatch = useDispatch();
    return (
        <Card>
            <PageHeader
                className="site-page-header"
                onBack={() => {
                    dispatch(goBack())
                }}
                title={props.title}
                style={{paddingLeft: 0, paddingTop: 0}}
            >
                {props.children}
            </PageHeader>
        </Card>
    );
};

DetailPageLayout.propTypes = {
    title: PropTypes.string.isRequired
};

export default DetailPageLayout;
