import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useWeekHelper } from '../../helper/WeekHelper'

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

const haveDateEvent = (date: { time: number, date: string }) => localStorage.getItem(JSON.stringify(date));

export default function CalendarRow(props: { time: number}) {

  const weekHelper = useWeekHelper();

  const [week, setWeek] = useState(weekHelper.getWeek());
  const [selectedDay, setSelectedDay] = useState(weekHelper.getDay());

  useEffect(() => weekHelper.subscribeWeek(setWeek), []);
  useEffect(() => weekHelper.subscribeDay(setSelectedDay), []);
  useEffect(() => weekHelper.setDay(null), [week]);

  const renderDayWithInfo = (day: Date) => {

    if (selectedDay !== null && selectedDay.day.toDateString() === day.toDateString() && selectedDay.time === props.time)
      return <TCellSelected />

    return(
      (haveDateEvent({time: props.time, date: day.toDateString()}))?<TCellFilled onClick={() => weekHelper.setDay({ time: props.time, day })} />:<TCell onClick={() => weekHelper.setDay({ time: props.time, day })}/>
    )
  }

  const renderWeek = () => week.map(day => renderDayWithInfo(day));

  const weekTimes = useMemo(renderWeek, [week, selectedDay]);
  const time = useMemo(() => convertTime(props.time), [props.time]);

  return(
    <TRow>
      <THeader>{time}</THeader>
      {weekTimes}
    </TRow>
  )
}