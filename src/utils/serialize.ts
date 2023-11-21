import { InitialEditorStateType } from "@lexical/react/LexicalComposer";

const sample = {
  root: {
    children: [
      {
        children: [
          {
            type: "math",
            version: 1,
            value: "2x+3y=10",
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "について考えなさい",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

export function toEditorState(value: string): InitialEditorStateType {
  return JSON.stringify({
    root: {
      children: [],
    },
  });
}

export function fromEditorState() {}
