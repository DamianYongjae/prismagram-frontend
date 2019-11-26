import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ApolloPrivider } from "react-apollo-hooks";
import Client from "./Apollo/Client";
import { ApolloClient } from "apollo-boost";

ReactDOM.render(
  <ApolloClient client={Client}>
    <App />
  </ApolloClient>,
  document.getElementById("root")
);
