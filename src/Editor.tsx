import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
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
} from "lexical";
import { FC, useRef } from "react";
import { KatexNode } from "./KatexNode";
import { INSERT_KATEX_COMMAND, KatexPlugin } from "./KatexPlugin";
import { Placeholder } from "./Placeholder";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Button, Divider, Flex } from "antd";

const theme: EditorThemeClasses = {};

const onError = (error: Error) => {
  console.error(error);
};

const nodes = [KatexNode];

const InsertKatexButton: FC = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.dispatchCommand(INSERT_KATEX_COMMAND, {
      katex: "",
      inline: true,
    });
  };

  return <Button onClick={handleClick}>Insert Katex</Button>;
};

export const Editor: FC<{ initialValue: string }> = ({ initialValue }) => {
  const initialConfig: InitialConfigType = {
    theme,
    onError,
    nodes,
    namespace: "MathInput",
    editorState: JSON.stringify({
      root: {
        children: [
          {
            children: [
              {
                type: "katex",
                version: 1,
                value: "2x+3y=10",
              },
              {
                // detail: 0,
                // format: 0,
                mode: "normal",
                // style: "",
                text: "について考えなさい",
                type: "text",
                version: 1,
              },
            ],
            // direction: "ltr",
            // format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        // direction: "ltr",
        // format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    }),
  };
  const editorStateRef = useRef<EditorState | null>(null);

  function onChange(editorState: EditorState) {
    editorStateRef.current = editorState;
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root.getTextContent());
    });
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <KatexPlugin />

      <div className="editor-root">
        <PlainTextPlugin
          contentEditable={<ContentEditable className="editor" />}
          placeholder={<Placeholder value="問題を入力" />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
      </div>

      <HistoryPlugin />

      <Divider />

      <Flex gap="1rem">
        <InsertKatexButton />

        <Button
          onClick={() => {
            if (editorStateRef.current) {
              console.log(editorStateRef.current?.toJSON());
            }
          }}
        >
          Log Content
        </Button>
      </Flex>
    </LexicalComposer>
  );
};
