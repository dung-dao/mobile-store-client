import React from "react";
import { Switch, Route } from "react-router-dom";
import Proptypes from "prop-types";

const WithRouteComponent = (props) => {
  return (
    <Switch>
      props.routes.map(route =>(
      {<Route path={route.path} render={props.renderFunc}></Route>}))
    </Switch>
  );
};

WithRouteComponent.propTypes = {
  routeConfig: Proptypes.arrayOf(
    Proptypes.shape({
      path: Proptypes.string.isRequired,
      renderFunc: Proptypes.func.isRequired,
    })
  ),
};

export default WithRouteComponent;
