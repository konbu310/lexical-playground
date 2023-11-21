import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CommandListenerPriority,
  createCommand,
  LexicalCommand,
  RangeSelection,
} from "lexical";
import { useEffect } from "react";
import { $createMathNode, MathNode } from "../nodes/MathNode";

const EditorPriority: CommandListenerPriority = 0;

export const INSERT_MATH_COMMAND: LexicalCommand<{
  math: string;
  inline: boolean;
}> = createCommand<{ math: string; inline: boolean }>();

export const MathPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([MathNode])) {
      throw new Error("MathPlugin: MathNode not registered on editor.");
    }

    return editor.registerCommand<{ math: string; inline: boolean }>(
      INSERT_MATH_COMMAND,
      (payload) => {
        const { math, inline } = payload;
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const mathNode = $createMathNode(math, inline, true);
          (selection as RangeSelection).insertNodes([mathNode]);
        }
        return true;
      },
      EditorPriority,
    );
  }, [editor]);

  return null;
};
