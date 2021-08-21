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
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo) => {
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextIdState,
      })
    );
  };

  const editTodo = (id: number, editTodo: EditTodo) => {
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => (todo.id === id ? { ...todo, ...editTodo } : todo))
    );
  };

  const loadData = () => {
    initialTodos = JSON.parse(localStorage.getItem("todos")!) || [];
    if (initialTodos && initialTodos.length >= 1) {
      incrementNextId();
      setNextIdState(Math.max(...initialTodos.map((todo: Itodo) => todo.id)) + 1);
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
