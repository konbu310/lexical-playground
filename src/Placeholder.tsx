import { FC } from "react";
import { placeholder } from "./styles.css";

export const Placeholder: FC<{ value: string }> = ({ value }) => {
  return <div className={placeholder}>{value}</div>;
};
