import { $getRoot, EditorState, EditorThemeClasses } from "lexical";
import { FC, useEffect } from "react";
import LexicalComposer from "@lexical/react/LexicalComposer";
import LexicalPlainTextPlugin from "@lexical/react/LexicalPlainTextPlugin";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme: EditorThemeClasses = {};

const onChange = (editorState: EditorState) => {
  editorState.read(() => {
    const root = $getRoot();
    console.log(root.getTextContent());
  });
};

const onError = (error: Error) => {
  console.error(error);
};

const MyCustomAutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
};

export const Editor: FC<{}> = ({}) => {
  const initialConfig = { theme, onError };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalPlainTextPlugin
        contentEditable={<LexicalContentEditable />}
        placeholder={<div>Enter some text...</div>}
      />
      <LexicalOnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
};
