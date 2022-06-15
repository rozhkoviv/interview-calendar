import styled from 'styled-components'
import CalendarRow from './CalendarRow';

const DaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  height: 100%;
  width: 100%;
`

const TimeTable = styled.table`
  width: 100%;
  margin-top: 0.5rem;
  border-collapse: collapse;
  box-sizing: border-box;
  border-bottom-style: hidden;
`

const TimeTableBody = styled.tbody`

`

export default function CalendarDays() {

  const getTimeTable = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      times.push(
        <CalendarRow time={i} />
      );
    }
    return times;
  }

  return(
    <DaysContainer>
      <TimeTable>
        <TimeTableBody>
          {getTimeTable()}
        </TimeTableBody>
      </TimeTable>
    </DaysContainer>
  )
}