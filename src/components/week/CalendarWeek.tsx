import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useWeekHelper } from '../../helper/WeekHelper';
import CalendarWeekDay from './CalendarWeekDay';

const WeekContainer = styled.div`
  min-height: 5.7rem;
  width: 100%;
  background-color: #f6f6f6;
  border-top: 2px solid #ebebeb;
  border-bottom: 2px solid #ebebeb;
  display: flex;
  flex-direction: column;
  position: relative;
`

const WeekList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-left: 2.3rem;
  margin-top: 0.2rem;
`

const WeekListDay = styled.li`

  :nth-child(n)::before {
    font-size: 0.6rem;
  }

  :nth-child(1)::before {
    content: 'M';
  }
  :nth-child(2)::before {
    content: 'T';
  }
  :nth-child(3)::before {
    content: 'W';
  }
  :nth-child(4)::before {
    content: 'T';
  }
  :nth-child(5)::before {
    content: 'F';
  }
  :nth-child(6)::before {
    content: 'S';
  }
  :nth-child(7)::before {
    content: 'S';
  }
`

const WeekSelector = styled.div`
  display: flex;
  margin-top: -1.2rem;
  justify-content: space-between;
  align-items: center;
  padding-left: 2.3rem;
  font-size: 1.1rem;
`

const WeekSelectorArrowLeft = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;
  transform: rotate(-45deg);

  ::before, ::after {
    content: '';
    position: absolute;
    background-color: red;
    top: 50%;
    left: 50%;
  }

  ::before {
    width: 25%;
    height: 2px;
  }

  ::after {
    width: 2px;
    height: 25%;
  }
`
const WeekSelectorArrowRight = styled(WeekSelectorArrowLeft)`
  transform: rotate(135deg);
`

export default function CalendarWeek() {

  const weekHelper = useWeekHelper();

  const [week, setWeek] = useState(weekHelper.getWeek());

  useEffect(() => weekHelper.subscribeWeek(setWeek), []);

  const changeWeekForward = () => {
    const weekStart = weekHelper.getWeekStart();
    weekHelper.setWeek(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7));
  }

  const changeWeekBackward = () => {
    const weekStart = weekHelper.getWeekStart();
    weekHelper.setWeek(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7));
  }


  const getWeek = () => {
    return week.map(day => {
      return(
        <WeekListDay>
          <CalendarWeekDay day={day} />
        </WeekListDay>
      )
    });
  }

  const getMonth = () => {
    switch(weekHelper.getWeekStart().getMonth()) {
      case 0: return 'January';
      case 1: return 'February';
      case 2: return 'March';
      case 3: return 'April';
      case 4: return 'May';
      case 5: return 'June';
      case 6: return 'July';
      case 7: return 'August';
      case 8: return 'September';
      case 9: return 'October';
      case 10: return 'November';
      case 11: return 'December';
    }
  }

  const currentMonth = useMemo(getMonth, [week]);

  const currentWeek = useMemo(getWeek, [week]);

  return(
    <WeekContainer>
      <WeekList>
        {currentWeek}
      </WeekList>
      <WeekSelector>
        <WeekSelectorArrowLeft onClick={changeWeekBackward} />
          {currentMonth} {weekHelper.getWeekStart().getFullYear()}
        <WeekSelectorArrowRight onClick={changeWeekForward} />
      </WeekSelector>
    </WeekContainer>
  )
}