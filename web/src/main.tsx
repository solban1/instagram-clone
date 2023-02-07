import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import App from "./App";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
