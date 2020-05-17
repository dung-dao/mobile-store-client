import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { Switch } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/SignIn/SignIn";
import { useDispatch } from "react-redux";
import { relogin } from "./redux/userSlice";
import "./App.css";
import {Button, Space} from "antd";
import {DeleteOutlined, EditOutlined, InfoOutlined} from "@ant-design/icons";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(relogin());
  });

  return (
    <div>
      <Switch>
        <PublicRoute
          restricted={true}
          component={LoginPage}
          path="/signin"
          exact
        />
        <PrivateRoute path="/" component={Dashboard}/>
      </Switch>
    </div>
  );
};

export default App;
