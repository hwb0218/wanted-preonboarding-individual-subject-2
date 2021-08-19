import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDate } from "utils/getDate";

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding: 0 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const TimeText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const { day, date, time } = getDate();
  const [today, setToday] = useState({
    day,
    date,
    time,
  });

  useEffect(() => {
    let timer = setInterval(() => {
      setToday({ ...today, time });
    }, 1000);
    return () => clearInterval(timer);
  }, [today, time]);

  return (
    <TodoHeadBlock>
      <DayText>{today.day}</DayText>
      <DateText>{today.date}</DateText>
      <TimeText>{today.time}</TimeText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
