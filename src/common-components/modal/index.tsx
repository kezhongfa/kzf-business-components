import React from "react";
import { Modal } from "@shuyun-ep-team/kylin-ui";
import { IModalProps } from "@shuyun-ep-team/kylin-ui/es/modal/modal";

const CustomModal = (props: IModalProps & { children?: any }) => {
  const { bodyStyle, children, ...restProps } = props;

  return (
    <Modal
      width={560}
      keyboard={false}
      maskClosable={false}
      destroyOnClose={true}
      bodyStyle={{
        maxHeight: "calc(90vh - 110px)",
        overflow: "auto",
        paddingRight: 0,
        ...bodyStyle,
      }}
      {...restProps}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
