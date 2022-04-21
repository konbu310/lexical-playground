import LexicalComposer from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import LexicalPlainTextPlugin from "@lexical/react/LexicalPlainTextPlugin";
import {
  $getRoot,
  EditorState,
  EditorThemeClasses,
  LexicalNode,
  NodeMap,
} from "lexical";
import { FC, useRef } from "react";
import { KatexModal } from "./KatexModal";
import { KatexNode } from "./KatexNode";
import { INSERT_KATEX_COMMAND, KatexPlugin } from "./KatexPlugin";
import { Placeholder } from "./Placeholder";
import { editor, editorRoot } from "./styles.css";
import { useToggle } from "./useToggle";

const theme: EditorThemeClasses = {};

const onError = (error: Error) => {
  console.error(error);
};

const nodes = [KatexNode];

const InsertKatexButton: FC = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.dispatchCommand(INSERT_KATEX_COMMAND, {
      katex: "1+1",
      inline: true,
    });
  };

  return <button onClick={handleClick}>Insert Katex</button>;
};

const parse = ([key, node]: [string, LexicalNode]) => {
  switch (key) {
    case "root":
      break;
    default:
      break;
  }
};

const findNodeByKey = (nodes: [string, LexicalNode][], key: string) => {
  return nodes.find((node) => node[0] === key);
};

export const Editor: FC<{}> = ({}) => {
  const initialConfig = { theme, onError, nodes };
  const editorStateRef = useRef<EditorState | null>(null);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <InsertKatexButton />

      <KatexPlugin />

      <div className={editorRoot} onFocus={() => console.log("focus")}>
        <LexicalPlainTextPlugin
          contentEditable={<LexicalContentEditable className={editor} />}
          placeholder={<Placeholder value="問題を入力" />}
        />
        <LexicalOnChangePlugin
          onChange={(editorState) => (editorStateRef.current = editorState)}
        />
      </div>

      <HistoryPlugin />

      <div>
        <button
          onClick={() => {
            if (editorStateRef.current) {
              const nodeMap = editorStateRef.current?.toJSON()._nodeMap;
              nodeMap?.map((node) => {});
            }
          }}
        >
          Log Content
        </button>
      </div>
    </LexicalComposer>
  );
};
