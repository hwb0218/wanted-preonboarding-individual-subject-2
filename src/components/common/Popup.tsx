import React from "react";
import styled from "styled-components";
import { ModalInfo } from "components/todo/TodoService";
import { Modal } from "antd";

const StyledModal = styled(Modal)`
  & .ant-btn-primary {
    background: #119955;
  }
`;

interface PopupProps {
  isModalVisible: boolean;
  handleModalVisible: (visible: boolean) => void;
  removeTodo: (id: number) => void;
  modalInfo: ModalInfo;
}

const Popup = ({ isModalVisible, handleModalVisible, modalInfo, removeTodo }: PopupProps) => {
  const handleOk = () => {
    if (modalInfo.type === "removeToDo") {
      removeTodo(modalInfo.id!);
    }
    handleModalVisible(false);
  };

  const handleCancel = () => {
    handleModalVisible(false);
  };

  return (
    <StyledModal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} centered>
      <p>{modalInfo.text}</p>
    </StyledModal>
  );
};

export default React.memo(Popup);
