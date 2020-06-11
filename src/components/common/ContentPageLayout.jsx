import React from 'react';
import PageHeader from "antd/es/page-header";
import PropTypes from "prop-types";

const ContentPageLayout = (props) => {
    return (
        <PageHeader
            className="site-page-header"
            onBack={props.onGoBack}
            title={props.title}
        />
    );
};

ContentPageLayout.propTypes = {
    title: PropTypes.string.isRequired,
    onGoBack: PropTypes.func.isRequired
};

export default ContentPageLayout;