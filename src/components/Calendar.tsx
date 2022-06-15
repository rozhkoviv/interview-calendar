import styled from 'styled-components';
import CalendarDays from './days/CalendarDays';
import CalendarFooter from './footer/CalendarFooter';
import CalendarHeader from './header/CalendarHeader';
import CalendarWeek from './week/CalendarWeek';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 2px solid #ebebeb;
  border-right: 2px solid #ebebeb;
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media (min-width: 740px) {
    width: 740px;
  }
`

export default function Calendar (props: { name: string }) {

  return(
    <CalendarContainer>
      <CalendarHeader name={props.name} />
      <CalendarWeek />
      <CalendarDays />
      <CalendarFooter />
    </CalendarContainer>
  )
}