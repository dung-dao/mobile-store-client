import React from "react";
import AppLayout from "./layouts/AppLayout";
import IF from "./components/IF";
import DataTable from "./components/DataTable";

const Dashboard = () => {
  return (
    <div>
      <AppLayout>
        <IF condt={true}>
          <DataTable></DataTable>
        </IF>
      </AppLayout>
    </div>
  );
};

export default Dashboard;
