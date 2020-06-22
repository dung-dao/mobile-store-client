import React from 'react';
import Col from "antd/es/grid/col";
import {Row, Spin} from "antd";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

const LoadingPage = (props) => {
    return (
        <Row style={{height: props.fullScreen ? "100vh" : "100%"}} align="middle">
            <Col offset={8} span={8}>
                <Row justify="center">
                    <Spin indicator={<LoadingOutlined style={{fontSize: "6em"}} spin/>}/>
                </Row>
                <Row justify="center">
                    <span style={{marginTop: "1em"}}>Đang tải dữ liệu</span>
                </Row>
            </Col>
        </Row>
    );
};

export default LoadingPage;
