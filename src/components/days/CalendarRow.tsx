import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { SelectedDay, setDay } from '../../storage/reducer'

const THeader = styled.th`
  width: 2.3rem;
  font-weight: normal;
  transform: translate(0, -55%);
  border-style: hidden;
  color: #c0c0c0;
  font-size: 0.8rem;

  :last-child {
    height: 0;
  }
`

const TRow = styled.tr`
  height: 2.2rem;
`

const TCell = styled.td`
  border: 1px solid #e6e6e6;
  background-clip: content-box;
  padding: 1.5px;
`

const TCellFilled = styled(TCell)`
  background-color: #ebecff;
`

const TCellSelected = styled(TCell)`
  background-color: #b3b7ff;
`

const convertTime = (time: number) => {
  if (time < 10) return `0${time}:00`;
  return `${time}:00`;
}

export const haveDateEvent = (date: { time: number, date: string }) => !!localStorage.getItem(JSON.stringify(date));

export default function CalendarRow(props: { time: number}) {

  const { week, day } = useSelector((state: {
    day: SelectedDay | null;
    week: Date[];
  }) => state );

  const dispatcher = useDispatch();

  const renderDayWithInfo = (dayToRender: Date) => {

    if (day !== null && day.day.toDateString() === dayToRender.toDateString() && day.time === props.time)
      return <TCellSelected />

    return(
      (haveDateEvent({time: props.time, date: dayToRender.toDateString()}))?<TCellFilled onClick={() => dispatcher(setDay({ time: props.time, day: dayToRender }))} />:<TCell onClick={() => dispatcher(setDay({ time: props.time, day: dayToRender }))}/>
    )
  }

  const renderWeek = () => week.map(currentDay => renderDayWithInfo(currentDay));

  const weekTimes = useMemo(renderWeek, [week, day]);
  const time = useMemo(() => convertTime(props.time), [props.time]);

  return(
    <TRow>
      <THeader>{time}</THeader>
      {weekTimes}
    </TRow>
  )
}