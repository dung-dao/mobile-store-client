import React, { Component } from "react";
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;

class BlankLayout extends Component {
  render() {
    return (
      <Layout>
        <Header>Header</Header>
        <Content>{this.props.children}</Content>
        <Footer /*style={{ position: "absolute", bottom: 0, width: "100%" }}*/>
          Footer
        </Footer>
      </Layout>
    );
  }
}

export default BlankLayout;
