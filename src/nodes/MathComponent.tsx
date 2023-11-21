import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import { FC, useState } from "react";
import { MathModal } from "../ui/MathModal";
import { MathRenderer } from "../ui/MathRenderer";
import { $isMathNode } from "./MathNode";

export const MathComponent: FC<{
  nodeKey: string;
  defaultMath: string;
  inline: boolean;
  showModalOnMount: boolean;
}> = ({ nodeKey, defaultMath, inline, showModalOnMount }) => {
  const [editor] = useLexicalComposerContext();
  const [math, setMath] = useState(defaultMath);
  const [showMathModal, setShowMathModal] = useState(showModalOnMount);

  const handleEdit = () => {
    setShowMathModal(true);
  };

  const handleDelete = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isMathNode(node)) {
        node.remove();
      }
    });
  };

  const handleUpdate = (math: string) => {
    setShowMathModal(false);
    setMath(math);
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isMathNode(node)) {
        node.setMath(math);
        // いる？
        // node.selectNext(0, 0);
      }
    });
  };

  return (
    <>
      <span className="math-renderer-container" onClick={handleEdit}>
        {String.fromCharCode(160)}
        <span onClick={handleDelete} className="math-renderer-delete">
          x
        </span>
        <MathRenderer math={math} />
        {String.fromCharCode(160)}
      </span>

      <MathModal
        defaultMath={math}
        isOpen={showMathModal}
        onClose={handleUpdate}
      />
    </>
  );
};
