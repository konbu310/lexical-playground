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
      // katex.render(value, katexElement, {
      //   displayMode: !inline,
      //   errorColor: "#cc0000",
      //   output: "html",
      //   strict: "warn",
      //   throwOnError: false,
      //   trust: false,
      // });
      renderMathInElement(katexElement);
    }
  }, [value, inline]);

  return (
    <span
      role="button"
      tabIndex={-1}
      onClick={onClick}
      ref={katexElementRef}
      style={{
        // padding: "8px",
        // backgroundColor: "rgba(160, 216, 239, 0.5)",
        // border: "3px solid blue",
        cursor: "pointer",
        fontSize: "1.2rem",
      }}
    >
      {String.raw`\(${value}\)`}
    </span>
  );
};
