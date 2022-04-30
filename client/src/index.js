import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./css//main.scss";
import { AppWrapper } from "./utils/boxOfStates";

ReactDOM.render(
  <AppWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppWrapper>,
  document.getElementById("root")
);
