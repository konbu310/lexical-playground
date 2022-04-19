import katex from "katex";
import { FC, useEffect, useRef } from "react";

export const KatexRenderer: FC<{
  value: string;
  inline: boolean;
  onClick: VoidFunction;
}> = ({ value, inline, onClick }) => {
  const katexElementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const katexElement = katexElementRef.current;
    if (katexElement instanceof HTMLSpanElement) {
      katex.render(value, katexElement, {
        displayMode: !inline,
        errorColor: "#cc0000",
        output: "html",
        strict: "warn",
        throwOnError: false,
        trust: false,
      });
    }
  }, [value, inline]);

  return (
    <span role="button" tabIndex={-1} onClick={onClick} ref={katexElementRef} />
  );
};
