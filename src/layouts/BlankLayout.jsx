import React, {Component} from "react";
import "./BlankLayout.css";
import {Layout} from "antd";

const {Footer, Content} = Layout;

class BlankLayout extends Component {
    render() {
        return (
            <Layout style={{minHeight: "100vh"}}>
                <Content>{this.props.children}</Content>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}

export default BlankLayout;
