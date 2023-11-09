import React, { FC, useState } from "react";
import { MathInput } from "./MathInput";
import { Input, Modal, Space } from "antd";

export const KatexModal: FC<{
  value: string;
  isOpen: boolean;
  onClose: (value: string) => void;
}> = ({ value, isOpen, onClose }) => {
  const [text, setText] = useState(value);

  return (
    <Modal
      open={isOpen}
      onOk={() => onClose(text)}
      onCancel={() => onClose(value)}
      closeIcon={false}
      centered
      width={650}
      maskClosable={false}
      closable={false}
      styles={{
        mask: {
          zIndex: 1,
          pointerEvents: "none",
        },
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <MathInput
          value={text}
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            console.log("MathInput: ", value);
            setText(value);
          }}
        />

        <Input
          size="large"
          value={text}
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            setText(value);
          }}
          style={{ fontSize: "1.2rem" }}
        />
      </Space>
    </Modal>
  );
};
