import { Input, Modal, Space } from "antd";
import { FC, useState } from "react";
import { MathInput } from "./MathInput";

export const MathModal: FC<{
  defaultMath: string;
  isOpen: boolean;
  onClose: (value: string) => void;
}> = ({ defaultMath, isOpen, onClose }) => {
  const [math, setMath] = useState(defaultMath);

  return (
    <Modal
      open={isOpen}
      onOk={() => onClose(math)}
      onCancel={() => onClose(defaultMath)}
      closeIcon={false}
      centered
      width={650}
      styles={{
        mask: {
          zIndex: 1,
          pointerEvents: "none",
        },
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <MathInput
          value={math}
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            console.log("MathInput: ", value);
            setMath(value);
          }}
        />

        <Input
          size="large"
          value={math}
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            setMath(value);
          }}
          style={{ fontSize: "1.2rem" }}
        />
      </Space>
    </Modal>
  );
};
