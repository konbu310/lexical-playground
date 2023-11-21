import { DecoratorNode, EditorConfig, LexicalNode, NodeKey } from "lexical";
import { ReactNode } from "react";
import { MathComponent } from "./MathComponent";

export class MathNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return "math";
  }

  static clone(node: MathNode): MathNode {
    return new MathNode(
      node.__math,
      node.__inline,
      node.__showModalOnMount,
      node.__key,
    );
  }

  constructor(
    private __math: string,
    private __inline: boolean = true,
    private __showModalOnMount: boolean = false,
    key?: NodeKey,
  ) {
    super(key);
  }

  createDOM<EditorContext>(config: EditorConfig): HTMLElement {
    return document.createElement(this.__inline ? "span" : "div");
  }

  updateDOM(prevNode: MathNode): boolean {
    // If the inline property changes, replace the element
    return this.__inline !== prevNode.__inline;
  }

  setMath(math: string): void {
    // TODO: Better types
    const writable = this.getWritable();
    if ($isMathNode(writable)) {
      writable.__math = math;
    }
  }

  getTextContent(): string {
    return String.raw`\(${this.__math}\)`;
  }

  exportJSON() {
    return {
      type: "math",
      version: 1,
      value: this.__math,
    };
  }

  static importJSON(json: any): MathNode {
    return $createMathNode(json.value, true, false);
  }

  decorate(): ReactNode {
    return (
      <MathComponent
        defaultMath={this.__math}
        inline={this.__inline}
        nodeKey={this.__key}
        showModalOnMount={this.__showModalOnMount}
      />
    );
  }
}

export const $createMathNode = (
  math = "",
  inline = true,
  showModalOnMount = false,
): MathNode => {
  return new MathNode(math, inline, showModalOnMount);
};

export const $isMathNode = (node: LexicalNode | null): node is MathNode => {
  return node instanceof MathNode;
};
