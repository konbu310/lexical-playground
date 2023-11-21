import { renderMathInElement } from "mathlive";
import { FC, useEffect, useRef } from "react";

export const MathRenderer: FC<{ math: string }> = ({ math }) => {
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mathElm = mathRef.current;
    if (mathElm instanceof HTMLSpanElement) {
      renderMathInElement(mathElm);
    }
  }, [math]);

  return (
    <span
      ref={mathRef}
      className="math-renderer"
    >{String.raw`\(${math}\)`}</span>
  );
};
