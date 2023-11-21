import "mathlive";
import type { MathfieldElement } from "mathlive";
import {
  DetailedHTMLProps,
  FC,
  FormEventHandler,
  HTMLAttributes,
  useEffect,
  useRef,
} from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": DetailedHTMLProps<
        HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}

export const MathInput: FC<{
  value: string;
  onChange: FormEventHandler<MathfieldElement>;
}> = ({ value, onChange }) => {
  const mfRef = useRef<MathfieldElement>(null);

  useEffect(() => {
    const mf = mfRef.current;
    if (!mf) return;
    mf.value = value;
  }, [value]);

  return (
    <math-field
      ref={mfRef}
      onInput={onChange}
      style={{ width: "100%", fontSize: "1.5rem" }}
    >
      {value}
    </math-field>
  );
};
