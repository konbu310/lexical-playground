import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import {
  $getRoot,
  $getSelection,
  EditorState,
  EditorThemeClasses,
  LexicalNode,
} from "lexical";
import { FC, useRef } from "react";
import { KatexNode } from "./KatexNode";
import { INSERT_KATEX_COMMAND, KatexPlugin } from "./KatexPlugin";
import { Placeholder } from "./Placeholder";
import { editor, editorRoot } from "./styles.css";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

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
  const initialConfig = { theme, onError, nodes, namespace: "MathInput" };
  const editorStateRef = useRef<EditorState | null>(null);

  function onChange(editorState: EditorState) {
    editorStateRef.current = editorState;
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log(root, selection);
    });
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <InsertKatexButton />

      <KatexPlugin />

      <div className={editorRoot} onFocus={() => console.log("focus")}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className={editor} />}
          placeholder={<Placeholder value="問題を入力" />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
      </div>

      <HistoryPlugin />

      <div>
        <button
          onClick={() => {
            if (editorStateRef.current) {
              console.log(editorStateRef.current?.toJSON());
            }
          }}
        >
          Log Content
        </button>
      </div>
    </LexicalComposer>
  );
};
