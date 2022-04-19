import { LexicalEditor } from "lexical";
import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { INSERT_KATEX_COMMAND } from "./KatexPlugin";
import { KatexRenderer } from "./KatexRenderer";
import { useToggle } from "./useToggle";

export const KatexModal: FC<{
  activeEditor: LexicalEditor;
  onClose: VoidFunction;
}> = ({ activeEditor, onClose }) => {
  const [text, setText] = useState("");
  const [inline, toggleInline] = useToggle(true);

  const onConfirm = useCallback(() => {
    activeEditor.dispatchCommand(INSERT_KATEX_COMMAND, { katex: text, inline });
    onClose();
  }, [activeEditor, onClose, text, inline]);

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (ev) => {
    console.log(ev.currentTarget.value);
    setText(ev.currentTarget.value);
  };

  return (
    <div>
      <div>
        Inline:{" "}
        <input type="checkbox" checked={inline} onChange={toggleInline} />
      </div>

      <div>
        <input value={text} onChange={onChangeValue} />
      </div>

      <div>
        <KatexRenderer value={text} inline={inline} onClick={() => {}} />
      </div>

      <div>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};
