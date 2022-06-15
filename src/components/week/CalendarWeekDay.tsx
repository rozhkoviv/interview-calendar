import { useMemo } from 'react';
import styled from 'styled-components';

const DayOfMonth = styled.div`
  color: black;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
`
const Today = styled(DayOfMonth)`
  background-color: red;
  color: white;
`

export default function CalendarWeekDay (props: { day: Date }) {

  const getDay = () => {
    return (new Date().toDateString() === props.day.toDateString())?<Today>{props.day.getDate()}</Today>:<DayOfMonth>{props.day.getDate()}</DayOfMonth>;
  }

  const renderedDay = useMemo(getDay, [props.day]);

  return(
    <div>
      {renderedDay}
    </div>
  )
}