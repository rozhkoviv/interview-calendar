import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'
import { useWeekHelper } from '../../helper/WeekHelper'
import { haveDateEvent } from '../days/CalendarRow';

const FooterContainer = styled.footer`
  display: flex;
  min-height: 3rem;
  width: 100%;
  align-items: center;
  margin-top: auto;
  background-color: #f6f6f6;
  border-top: 2px solid #ebebeb;
  justify-content: space-between;
`

const FooterButton = styled.div`
  color: red;
  cursor: pointer;
  margin: 0 2rem;
`

export default function CalendarFooter () {

  const weekHelper = useWeekHelper();

  const [selectedDay, setSelectedDay] = useState(weekHelper.getDay());

  useEffect(() => weekHelper.subscribeDay(setSelectedDay), []);

  const setToday = () => {
    weekHelper.setWeek(new Date());
  }

  const deleteDay = () => {
    if (selectedDay) {
      localStorage.removeItem(JSON.stringify({time: selectedDay.time, date: selectedDay.day.toDateString()}));
      weekHelper.setWeek(weekHelper.getWeekStart());
    }
  }

  const getDeleteButton = useMemo(() => (selectedDay && haveDateEvent({time: selectedDay.time, date: selectedDay.day.toDateString()}))?<FooterButton onClick={deleteDay}>Delete</FooterButton>:null, [selectedDay]);

  return(
    <FooterContainer>
      <FooterButton onClick={setToday}>Today</FooterButton>
      {getDeleteButton}
    </FooterContainer>
  )
}