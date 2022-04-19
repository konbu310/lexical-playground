import { $getRoot, EditorState, EditorThemeClasses } from "lexical";
import { FC, useEffect } from "react";
import LexicalComposer from "@lexical/react/LexicalComposer";
import LexicalPlainTextPlugin from "@lexical/react/LexicalPlainTextPlugin";
import LexicalRichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { KatexModal } from "./KatexModal";
import { KatexNode } from "./KatexNode";
import { KatexPlugin } from "./KatexPlugin";
import { useToggle } from "./useToggle";

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

const nodes = [KatexNode];

const UseKatexModal: FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isShowModal, toggleIsShowModal] = useToggle(false);

  return (
    <>
      <button onClick={toggleIsShowModal}>Show Modal</button>

      {isShowModal && (
        <KatexModal activeEditor={editor} onClose={toggleIsShowModal} />
      )}
    </>
  );
};

export const Editor: FC<{}> = ({}) => {
  const initialConfig = { theme, onError, nodes };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <UseKatexModal />
      <KatexPlugin />
      <LexicalRichTextPlugin
        contentEditable={<LexicalContentEditable />}
        placeholder={<div>Enter some text...</div>}
      />
      <LexicalOnChangePlugin onChange={onChange} />
      <HistoryPlugin />
    </LexicalComposer>
  );
};
