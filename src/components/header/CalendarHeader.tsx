import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { reloadWeek, SelectedDay } from '../../storage/reducer';

const Header = styled.header`
    display: flex;
    min-height: 5rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: white;
  `

const CalendarName = styled.div`
  display: flex;
  margin-left: 2rem;
  font-size: 1.3rem;
`

const AddButton = styled.div`
  display: flex;
  margin-right: 2rem;
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;

  ::before, ::after {
    content: '';
    position: absolute;
    background-color: red;
    top: 50%;
    left: 50%;
  }

  ::before {
    height: 2px;
    width: 50%;
    transform: translate(-50%, -50%);
  }

  ::after {
    height: 50%;
    width: 2px;
    transform: translate(-50%, -50%);
  }
`

export default function CalendarHeader( props: { name: string } ) {

  const dispatcher = useDispatch();

  const addEvent = () => {
    const eventTime = prompt('Enter event time:\nYYYY-MM-DD HH:mm:ss');
    if (eventTime && /[0-9]{4}-(1[0-2]|[0][0-9])-([0-2][0-9]|[3][0-1]) ([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/gm.test(eventTime)) {
      const date = new Date(eventTime);
      const hours = date.getHours();
      const eventDate = { time: hours, date: date.toDateString() };
      localStorage.setItem(JSON.stringify(eventDate), 'true');
      dispatcher(reloadWeek());
    }
  }

  return(
    <Header>
      <CalendarName>
        {props.name}
      </CalendarName>
      <AddButton onClick={addEvent}/>
    </Header>
  )
}