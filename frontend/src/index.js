import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./css//main.scss";
import { AppWrapper } from "./utils/contextState";

ReactDOM.render(
  <AppWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppWrapper>,
  document.getElementById("root")
);
