/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  date: string;
};

export interface ModalInfo {
  type: string;
  text: string;
  id?: number;
}

export interface EditTodo {
  text: string;
  date: string;
}

let initialTodos: Itodo[] = [];

// hooks 폴더안에 넣자 커스텀훅이니까
export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({ type: "", text: "" });
  const [nextIdState, setNextIdState] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    setNextIdState((prev) => prev + 1);
  };

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const removeTodo = (id: number) => {
    // @removeTodo 수정
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo) => {
    let nextId: number = todoState.length > 0 ? todoState[todoState.length - 1].id + 1 : 1;
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId,
      })
    );
  };

  const editTodo = (id: number, editTodo: EditTodo) => {
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => (todo.id === id ? { ...todo, ...editTodo } : todo))
    );
  };

  const loadData = () => {
    let data: string | null = localStorage.getItem("todos");
    if (data === null) {
      return localStorage.setItem("todos", JSON.stringify(todoState));
    }
    initialTodos = JSON.parse(data);
    if (initialTodos && initialTodos.length >= 1) {
      incrementNextId();
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  const handleModalVisible = (visible: boolean, type: ModalInfo = modalInfo) => {
    setModalInfo(type);
    setIsModalVisible(visible);
  };

  return {
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
  };
};
