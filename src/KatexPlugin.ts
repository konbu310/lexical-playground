import {
  CommandListenerEditorPriority,
  createCommand,
  LexicalCommand,
} from "lexical";
import "katex/dist/katex.css";
import { ReactNode, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const EditorPriority: CommandListenerEditorPriority = 0;

export const INSERT_KATEX_COMMAND: LexicalCommand<{
  katex: string;
  inline: boolean;
}> = createCommand();

export const KatexPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {}, []);

  return null;
};
