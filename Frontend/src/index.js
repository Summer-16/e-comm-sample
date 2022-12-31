
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ECommControllerProvider } from "./context";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import './assets/css/custom.css';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ECommControllerProvider>
      <PerfectScrollbar>
        <App />
      </PerfectScrollbar>
    </ECommControllerProvider>
  </BrowserRouter>
);
