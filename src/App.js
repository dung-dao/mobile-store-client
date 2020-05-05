import React, { Component } from "react";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import IF from "./components/IF";
import DataTable from "./components/DataTable";

class App extends Component {
  render() {
    return (
      <AppLayout>
        <IF condt={true}>
          <DataTable></DataTable>
        </IF>
      </AppLayout>
    );
  }
}

export default App;
