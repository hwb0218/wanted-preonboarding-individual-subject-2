import React from "react";
import { useTodo } from "./TodoService";
import TodoTemplate from "./template/TodoTemplate";
import TodoHead from "./template/head/TodoHead";
import TodoList from "./template/list/TodoList";
import TodoCreate from "./template/create/TodoCreate";
import TodoFooter from "./template/footer/TodoFooter";
import Popup from "components/common/Popup";

const TodoContainer = () => {
  const {
    todoState,
    nextIdState,
    isModalVisible,
    modalInfo,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
    editTodo,
    handleModalVisible,
  } = useTodo();

  return (
    <>
      <TodoTemplate>
        <TodoHead />
        <TodoCreate
          nextId={nextIdState}
          createTodo={createTodo}
          incrementNextId={incrementNextId}
          handleModalVisible={handleModalVisible}
        />
        <TodoList
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
          todos={todoState}
          handleModalVisible={handleModalVisible}
        />
        <TodoFooter todos={todoState} />
        <Popup {...{ isModalVisible, handleModalVisible, modalInfo, removeTodo }} />
      </TodoTemplate>
    </>
  );
};

export default TodoContainer;
