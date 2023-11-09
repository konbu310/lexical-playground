import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getNodeByKey,
  DecoratorNode,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";
import { FC, ReactNode, useCallback, useRef, useState } from "react";
import { KatexRenderer } from "./KatexRenderer";
import { KatexModal } from "./KatexModal";

type KatexComponentProps = {
  katex: string;
  inline: boolean;
  nodeKey: NodeKey;
  showModalOnMount: boolean;
};

export const KatexComponent: FC<KatexComponentProps> = ({
  katex,
  inline,
  nodeKey,
  showModalOnMount = false,
}) => {
  const [editor] = useLexicalComposerContext();
  const [katexValue, setKatexValue] = useState(katex);
  const [showKatexModal, setShowKatexModal] = useState(showModalOnMount);

  const onCloseModal = useCallback(
    (value: string) => {
      setShowKatexModal(false);
      setKatexValue(value);
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isKatexNode(node)) {
          node.setKatex(value);
          node.selectNext(0, 0);
        }
      });
    },
    [editor, katexValue, nodeKey],
  );

  return (
    <>
      <KatexRenderer
        inline={inline}
        onClick={() => setShowKatexModal(true)}
        value={katexValue}
      />
      <KatexModal
        value={katexValue}
        isOpen={showKatexModal}
        onClose={onCloseModal}
      />
    </>
  );
};

export class KatexNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return "katex";
  }

  static clone(node: KatexNode): KatexNode {
    return new KatexNode(
      node.__katex,
      node.__inline,
      node.__showModalOnMount,
      node.__key,
    );
  }

  constructor(
    private __katex: string,
    private __inline: boolean = true,
    private __showModalOnMount: boolean = false,
    key?: NodeKey,
  ) {
    super(key);
  }

  createDOM<EditorContext>(config: EditorConfig): HTMLElement {
    return document.createElement(this.__inline ? "span" : "div");
  }

  updateDOM(prevNode: KatexNode): boolean {
    // If the inline property changes, replace the element
    return this.__inline !== prevNode.__inline;
  }

  setKatex(katex: string): void {
    // TODO: Better types
    const writable = this.getWritable();
    if ($isKatexNode(writable)) {
      writable.__katex = katex;
    }
  }

  getTextContent(): string {
    return String.raw`\(${this.__katex}\)`;
  }

  exportJSON() {
    return {
      type: "katex",
      version: 1,
      value: this.__katex,
    };
  }

  static importJSON(json: any): KatexNode {
    return $createKatexNode(json.value, true, false);
  }

  decorate(): ReactNode {
    return (
      <KatexComponent
        katex={this.__katex}
        inline={this.__inline}
        nodeKey={this.__key}
        showModalOnMount={this.__showModalOnMount}
      />
    );
  }
}

export const $createKatexNode = (
  katex = "",
  inline = true,
  showModalOnMount = false,
): KatexNode => {
  return new KatexNode(katex, inline, showModalOnMount);
};

export const $isKatexNode = (node: LexicalNode | null): node is KatexNode => {
  return node instanceof KatexNode;
};
