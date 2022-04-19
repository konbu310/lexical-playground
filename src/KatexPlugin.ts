import {
  $getSelection,
  $isRangeSelection,
  CommandListenerEditorPriority,
  createCommand,
  LexicalCommand,
  RangeSelection,
} from "lexical";
import "katex/dist/katex.css";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createKatexNode, KatexNode } from "./KatexNode";

const EditorPriority: CommandListenerEditorPriority = 0;

export const INSERT_KATEX_COMMAND: LexicalCommand<{
  katex: string;
  inline: boolean;
}> = createCommand<{ katex: string; inline: boolean }>();

export const KatexPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([KatexNode])) {
      throw new Error("KatexPlugin: KatexNode not registered on editor.");
    }

    return editor.registerCommand<
      LexicalCommand<{ katex: string; inline: boolean }>
    >(
      INSERT_KATEX_COMMAND,
      (payload) => {
        const { katex, inline } = payload;
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const katexNode = $createKatexNode(katex, inline);
          (selection as RangeSelection).insertNodes([katexNode]);
        }
        return true;
      },
      EditorPriority
    );
  }, [editor]);

  return null;
};
