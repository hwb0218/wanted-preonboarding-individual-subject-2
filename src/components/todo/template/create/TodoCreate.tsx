import React, { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Itodo, ModalInfo } from "components/todo/TodoService";
import { DatePicker } from "antd";
import moment from "moment";

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 10%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;

  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 160px;
  height: 60px;

  input {
    color: #119955;
    font-weight: bold;
  }

  .ant-picker-focused {
    box-shadow: 0 0 0 2px rgb(24 144 255 / 50%);
  }
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
  handleModalVisible: (visible: boolean, type: ModalInfo) => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId,
  handleModalVisible,
}: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

  const handleToggle = () => setOpen(!open);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleChangeDate = (dateObj: moment.Moment | null, dateString: string) => {
    setSelectedDate(dateString);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    if (!value || !selectedDate) {
      const modalInfo = {
        type: "createToDo",
        text: "할 일이나 날짜를 선택해주세요😃!",
      };
      return handleModalVisible(true, modalInfo);
    }
    createTodo({
      id: nextId,
      text: value,
      done: false,
      date: selectedDate,
    });
    incrementNextId(); // nextId 하나 증가

    setValue(""); // input 초기화
    setOpen(false); // open 닫기
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
          />
          <StyledDatePicker
            disabledDate={(current) => current && current < moment().subtract(1, "days")}
            defaultValue={moment()}
            onChange={handleChangeDate}
          />
          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
