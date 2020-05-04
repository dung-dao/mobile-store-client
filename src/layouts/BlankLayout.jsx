import React, { Component } from "react";
import "./BlankLayout.css";
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;

class BlankLayout extends Component {
  render() {
    return (
      <Layout className="main">
        <Content className="content">{this.props.children}</Content>
        <Footer className="footer">Footer</Footer>
      </Layout>
    );
  }
}

export default BlankLayout;
