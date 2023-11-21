import katex from "katex";
import { FC, useEffect, useRef } from "react";
import { renderMathInElement } from "mathlive";

// ContentEditable内でKaTeXをレンダリングするためのコンポーネント
export const KatexRenderer: FC<{
  value: string;
  inline: boolean;
  onClick: VoidFunction;
}> = ({ value, inline, onClick }) => {
  const katexElementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const katexElement = katexElementRef.current;
    if (katexElement instanceof HTMLSpanElement) {
      renderMathInElement(katexElement);
    }
  }, [value, inline]);

  return (
    <span>
      {String.fromCharCode(160)}
      <span
        style={{
          cursor: "pointer",
          fontSize: "1.2rem",
        }}
        ref={katexElementRef}
        onClick={onClick}
      >{String.raw`\(${value}\)`}</span>
      {String.fromCharCode(160)}
    </span>
  );
};
