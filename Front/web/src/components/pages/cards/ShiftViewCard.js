import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import '../../css/ShiftViewCard.css'

const localizer = momentLocalizer(moment)

const myEventsList = [
  {
    title: 'Meeting',
    start: new Date(2022, 9, 10, 10, 0),
    end: new Date(2022, 9, 10, 12, 0),
  },
  {
    title: 'Lunch Break',
    start: new Date(2022, 9, 10, 12, 0),
    end: new Date(2022, 9, 10, 13, 0),
  },
  {
    title: 'Team Discussion',
    start: new Date(2022, 9, 10, 14, 0),
    end: new Date(2022, 9, 10, 16, 0),
  }
]
const ShiftViewCard = (props) => (
  <div className='SVCard'>
    <h1>Shift View</h1>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 200 }}
    />
  </div>
)

export default ShiftViewCard