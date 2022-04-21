import { style } from "@vanilla-extract/css";

export const editorRoot = style({
  position: "relative",
});

export const editor = style({
  border: "1px solid black",
  padding: "0 8px",
});

export const placeholder = style({
  position: "absolute",
  top: "50%",
  left: "8px",
  transform: "translateY(-50%)",
  color: "grey",
  userSelect: "none",
  pointerEvents: "none",
  display: "inline-block",
  selectors: {
    [`${editor}:focus ~ &`]: {
      opacity: 0.25,
    },
  },
});
