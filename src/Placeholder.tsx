import { FC } from "react";

export const Placeholder: FC<{ value: string }> = ({ value }) => {
  return <div className="placeholder">{value}</div>;
};
