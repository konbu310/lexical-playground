import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { Button, Divider, Flex } from "antd";
import {
  $getRoot,
  $getSelection,
  EditorState,
  EditorThemeClasses,
} from "lexical";
import { FC, useRef } from "react";
import { MathNode } from "./nodes/MathNode";
import { INSERT_MATH_COMMAND, MathPlugin } from "./plugins/MathPlugin";
import { Placeholder } from "./ui/Placeholder";

const theme: EditorThemeClasses = {};

const onError = (error: Error) => {
  console.error(error);
};

const nodes = [MathNode];

const InsertMathButton: FC = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.dispatchCommand(INSERT_MATH_COMMAND, {
      math: "",
      inline: true,
    });
  };

  return <Button onClick={handleClick}>Insert Math</Button>;
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
                type: "math",
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
      <MathPlugin />

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
        <InsertMathButton />

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
