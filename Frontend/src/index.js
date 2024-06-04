import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { LoginProvider } from "./context/usercontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginProvider>
    <App />
  </LoginProvider>
);
