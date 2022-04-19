import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  CommandListenerHighPriority,
  DecoratorNode,
  EditorConfig,
  KEY_ESCAPE_COMMAND,
  LexicalNode,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { KatexEditor } from "./KatexEditor";
import { KatexRenderer } from "./KatexRenderer";

const HighPriority: CommandListenerHighPriority = 3;

type KatexComponentProps = {
  katex: string;
  inline: boolean;
  nodeKey: NodeKey;
};

export const KatexComponent: FC<KatexComponentProps> = ({
  katex,
  inline,
  nodeKey,
}) => {
  const [editor] = useLexicalComposerContext();
  const [katexValue, setKatexValue] = useState(katex);
  const [showKatexEditor, setShowKatexEditor] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onHideKatexEditor = useCallback(
    (restoreSelection?: boolean) => {
      setShowKatexEditor(false);
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isKatexNode(node)) {
          node.setKatex(katexValue);
          if (restoreSelection) {
            node.selectNext(0, 0);
          }
        }
      });
    },
    [editor, katexValue, nodeKey]
  );

  useEffect(() => {
    if (showKatexEditor) {
      mergeRegister(
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          (payload) => {
            const activeElement = document.activeElement;
            const inputElement = inputRef.current;
            if (inputElement !== activeElement) {
              onHideKatexEditor();
            }
            return false;
          },
          HighPriority
        ),
        editor.registerCommand(
          KEY_ESCAPE_COMMAND,
          (payload) => {
            const activeElement = document.activeElement;
            const inputElement = inputRef.current;
            if (inputElement !== activeElement) {
              onHideKatexEditor();
              return true;
            }
            return false;
          },
          HighPriority
        )
      );
    }
  }, [editor, onHideKatexEditor, showKatexEditor]);

  if (showKatexEditor) {
    return (
      <KatexEditor
        katex={katexValue}
        setKatex={setKatexValue}
        inline={inline}
        inputRef={inputRef}
      />
    );
  }

  return (
    <KatexRenderer
      inline={inline}
      onClick={() => setShowKatexEditor(true)}
      value={katexValue}
    />
  );
};

export class KatexNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return "katex";
  }

  static clone(node: KatexNode): KatexNode {
    return new KatexNode(node.katex, node.inline, node.__key);
  }

  private katex: string;
  private inline: boolean;

  constructor(katex: string, inline?: boolean, key?: NodeKey) {
    super(key);
    this.katex = katex;
    this.inline = inline ?? false;
  }

  createDOM<EditorContext>(config: EditorConfig<EditorContext>): HTMLElement {
    return document.createElement(this.inline ? "span" : "div");
  }

  updateDOM(prevNode: KatexNode): boolean {
    // If the inline property changes, replace the element
    return this.inline !== prevNode.inline;
  }

  setKatex(katex: string): void {
    // TODO: Better types
    const writable = this.getWritable() as any;
    writable.katex = katex;
  }

  decorate(): ReactNode {
    return (
      <KatexComponent
        katex={this.katex}
        inline={this.inline}
        nodeKey={this.__key}
      />
    );
  }
}

export const $createKatexNode = (katex = "", inline = false): KatexNode => {
  return new KatexNode(katex, inline);
};

export const $isKatexNode = (node: LexicalNode | null): node is KatexNode => {
  return node instanceof KatexNode;
};
