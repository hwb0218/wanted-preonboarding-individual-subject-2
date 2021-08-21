import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import styled from "styled-components";
import { Itodo, EditTodo } from "components/todo/TodoService";

interface EditTodoItemProps {
  todo: Itodo;
  editTodo: (id: number, editTodo: EditTodo) => void;
  handleShowEdit: (show: boolean) => void;
}

const EditInput = styled.input`
  flex: 1;
  background: inherit;
  color: #777777;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-bottom: 1px solid #dddddd;
  color: #33bb77;
  padding: 0 5px;
  margin-right: 5px;

  &:focus {
    outline: none;
  }
`;

const EditDate = styled(DatePicker)`
  width: 120px;
  input {
    color: #119955;
    font-weight: bold;
  }
`;

const EditToDoBtn = styled.button`
  border: 1px solid #119955;
  border-radius: 3px;
  background: inherit;
  color: #777777;
  cursor: pointer;
`;

const CancleEditBtn = styled.button`
  border: none;
  background: inherit;
  color: #777777;
  cursor: pointer;
`;

const EditTodoItem = ({ todo, handleShowEdit, editTodo }: EditTodoItemProps) => {
  const [editTodoState, setEditTodoState] = useState({ text: todo.text, date: todo.date });

  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditTodoState({ ...editTodoState, text: value });
  };

  const handleChangeDate = (dateObj: moment.Moment | null, dateString: string) => {
    setEditTodoState({ ...editTodoState, date: dateString });
  };

  const handleClickEditBtn = () => {
    editTodo(todo.id, editTodoState);
    handleShowEdit(false);
  };

  return (
    <>
      <EditInput type="text" value={editTodoState.text} onChange={handleChangeTodo} />
      <EditDate
        defaultValue={moment(editTodoState.date)}
        disabledDate={(current) => current && current < moment().subtract(1, "days")}
        bordered={false}
        onChange={handleChangeDate}
      />
      <EditToDoBtn onClick={handleClickEditBtn}>Edit</EditToDoBtn>
      <CancleEditBtn onClick={() => handleShowEdit(false)}>✖</CancleEditBtn>
    </>
  );
};

export default EditTodoItem;
