import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { assertNever } from "./assertNever";

type CustomNode =
  | SerializedParagraphNode
  | SerializedMathNode
  | SerializedTextNode
  | SerializedLineBreakNode;

type SerializedParagraphNode = SerializedLexicalNode & {
  type: "paragraph";
  children: CustomNode[];
};

type SerializedTextNode = SerializedLexicalNode & {
  type: "text";
  text: string;
};

type SerializedMathNode = SerializedLexicalNode & {
  type: "math";
  value: string;
};

type SerializedLineBreakNode = SerializedLexicalNode & {
  type: "linebreak";
};

export function editorStateSerializer(
  value: SerializedEditorState<CustomNode>,
) {
  const res: string[] = [];
  for (const node of value.root.children) {
    if (node.type === "paragraph") {
      if (res.length !== 0) res.push("\n");
      for (const child of node.children) {
        if (child.type === "paragraph") {
        } else if (child.type === "math") {
          res.push(String.raw`\$${child.value}\$`);
        } else if (child.type === "text") {
          res.push(child.text);
        } else if (child.type === "linebreak") {
          res.push("<br />");
        } else {
          assertNever(child);
        }
      }
    }
  }
  return res.join("");
}

export function editorStateDeserializer(value: string) {
  const regexp = new RegExp(String.raw`(\\\$.+?\\\$|<br />)`);
  const root = {
    type: "root",
    version: 1,
    children: [] as CustomNode[],
  };

  for (const paragraph of value.split("\n")) {
    const children: CustomNode[] = [];
    for (const text of paragraph.split(regexp)) {
      if (text.startsWith("\\$")) {
        children.push({
          type: "math",
          version: 1,
          value: text.replaceAll("\\$", ""),
        });
      } else if (text.startsWith("<br />")) {
        children.push({
          type: "linebreak",
          version: 1,
        });
      } else {
        children.push({
          type: "text",
          version: 1,
          text,
        });
      }
    }
    root.children.push({
      type: "paragraph",
      version: 1,
      children,
    });
  }

  return JSON.stringify({ root });
}
