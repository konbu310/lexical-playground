import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Button, Divider, Flex } from "antd";
import { $getRoot, $getSelection, EditorState } from "lexical";
import { FC, useRef } from "react";
import { MathNode } from "./nodes/MathNode";
import { INSERT_MATH_COMMAND, MathPlugin } from "./plugins/MathPlugin";
import { theme } from "./theme";
import { Placeholder } from "./ui/Placeholder";
import {
  editorStateDeserializer,
  editorStateSerializer,
} from "./utils/serialize";

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
    editorState: editorStateDeserializer(initialValue),
  };
  const editorStateRef = useRef<EditorState | null>(null);

  function onChange(editorState: EditorState) {
    editorStateRef.current = editorState;
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();
    });
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <MathPlugin />

      <div className="editor-root">
        <RichTextPlugin
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
              const json = editorStateRef.current.toJSON() as any;
              console.log("json: ", json);
              const s = editorStateSerializer(json);
              console.log("serialized: ", s);
              const d = editorStateDeserializer(s);
              console.log("deserialized: ", JSON.parse(d));
            }
          }}
        >
          Log Content
        </Button>
      </Flex>
    </LexicalComposer>
  );
};
