import React, { useState } from "react";
import { EditTodo, Itodo, ModalInfo } from "components/todo/TodoService";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components";
import EditTodoItem from "./EditTodoItem";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  color: #119955;
  font-size: 16px;
  cursor: pointer;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const Date = styled.div<{ done: boolean }>`
  font-size: 16px;
  padding: 0 2px;
  background: #119955;
  border-radius: 3px;
  margin-right: 5px;
  color: #fff;

  color: ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      background: #ced4da;
    `};
`;

const EditBtn = styled.button`
  border: 1px solid #119955;
  border-radius: 3px;
  background: inherit;
  color: #777777;
  cursor: pointer;
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, editTodo: EditTodo) => void;
  todo: Itodo;
  handleModalVisible: (visible: boolean, type: ModalInfo) => void;
}

const TodoItem = ({
  toggleTodo,
  removeTodo,
  editTodo,
  todo,
  handleModalVisible,
}: TodoItemProps) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleRemove = () => {
    if (todo.done === false) {
      const modalInfo = {
        type: "removeToDo",
        text: "정말 삭제 하시겠습니까😮?",
        id: todo.id,
      };
      return handleModalVisible(true, modalInfo);
    }
    removeTodo(todo.id);
  };

  const handleShowEdit = (show: boolean) => setShowEdit(show);

  return (
    <TodoItemBlock>
      {showEdit ? (
        <EditTodoItem todo={todo} handleShowEdit={handleShowEdit} editTodo={editTodo} />
      ) : (
        <>
          <CheckCircle done={todo.done} onClick={handleToggle}>
            {todo.done && <CheckOutlined />}
          </CheckCircle>
          <Text done={todo.done}>{todo.text}</Text>
          <Date done={todo.done}>{todo.date.substring(5)}</Date>
          <EditBtn onClick={() => setShowEdit(!showEdit)}>Edit</EditBtn>
          <Remove onClick={handleRemove}>
            <DeleteOutlined />
          </Remove>
        </>
      )}
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
