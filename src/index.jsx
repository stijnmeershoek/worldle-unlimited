import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./reset.css";
import "./global.css";
import App from "./App";
import { AppProvider } from "./context";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
