import "katex/dist/katex.css";
import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import { Editor } from "./Editor";
import "./style.css";

const App: FC<{}> = ({}) => {
  return (
    <div style={{ margin: 50 }}>
      <h1>Lexical Math Editor</h1>
      <Editor
        initialValue={String.raw`\$2x+3y\$について考えなさい
ほげほげ`}
      />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
