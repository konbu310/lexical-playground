import {
  ChangeEventHandler,
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useCallback,
} from "react";
import { KatexRenderer } from "./KatexRenderer";

type KatexEditorProps = {
  katex: string;
  inline: boolean;
  inputRef: RefObject<HTMLInputElement>;
  setKatex: Dispatch<SetStateAction<string>>;
};

export const KatexEditor: FC<KatexEditorProps> = ({
  katex,
  setKatex,
  inline,
  inputRef,
}) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setKatex(event.target.value);
    },
    [setKatex],
  );

  return (
    <span style={{ position: "relative" }}>
      <span>$</span>
      <input value={katex} onChange={onChange} autoFocus ref={inputRef} />
      <span>$</span>

      <span style={{ position: "absolute", top: "250%", left: 0 }}>
        <KatexRenderer value={katex} inline={inline} onClick={() => {}} />
      </span>
    </span>
  );
};
