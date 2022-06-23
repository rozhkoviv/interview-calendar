import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentWeek, reloadWeek, SelectedDay, setDay } from '../../storage/reducer';
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

  const currentDay = useSelector((state: { day: null | SelectedDay, week: Date[] }) => state.day);

  const dispatcher = useDispatch();

  const setToday = () => {
    dispatcher(currentWeek());
  }

  const deleteDay = () => {
    if (currentDay) {
      localStorage.removeItem(JSON.stringify({time: currentDay.time, date: currentDay.day.toDateString()}));
      dispatcher(setDay(null));
    }
  }

  const getDeleteButton = useMemo(() => (currentDay && haveDateEvent({time: currentDay.time, date: currentDay.day.toDateString()}))?<FooterButton onClick={deleteDay}>Delete</FooterButton>:null, [currentDay]);

  return(
    <FooterContainer>
      <FooterButton onClick={setToday}>Today</FooterButton>
      {getDeleteButton}
    </FooterContainer>
  )
}