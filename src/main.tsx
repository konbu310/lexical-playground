import React from "react";
import ReactDOM from "react-dom/client";
import { Editor } from "./Editor";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
);
