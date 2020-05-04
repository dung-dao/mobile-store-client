import React from "react";
import WithRouteComponent from "../../components/WithRouteComponent";

const routeConfig = [
  { path: "", renderFunc: (props) => {} },
  { path: "", renderFunc: (props) => {} },
  { path: "", renderFunc: (props) => {} },
  { path: "", renderFunc: (props) => {} },
  { path: "", renderFunc: (props) => {} },
  { path: "", renderFunc: (props) => {} },
];

const Products = () => {
  return <WithRouteComponent routeConfig={routeConfig}></WithRouteComponent>;
};

export default Products;
