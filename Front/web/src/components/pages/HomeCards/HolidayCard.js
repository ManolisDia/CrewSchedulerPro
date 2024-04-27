import React from 'react'
import '../../css/HolidayCard.css'

const requests = [
  {
    name: 'John Doe ',
    type: 'Holiday',
    date: '12/12/2021',
  },
  {
    name: 'Jane Doe ',
    type: 'Holiday',
    date: '12/12/2021',

  },
  {
    name: 'John Oliver ',
    type: 'Overtime',
    date: '12/12/2021',
  },
  {
    name: 'Jane Oliver ',
    type: 'Swap',
    date: '12/12/2021',
  },
  {
    name: 'John Oliver ',
    type: 'Swap',
    date: '12/12/2021',
  },
  {
    name: 'John Doe ',
    type: 'Holiday',
    date: '12/12/2021',
  },
  {
    name: 'Jane Doe ',
    type: 'Holiday',
    date: '12/12/2021',
  }
]

function HolidayCard() {
  return (
    <div className='HCard'>
      <h1>Holiday Card</h1>
      <>
        {requests.map(function(data)
        {
          return (
            <div>
              name: {data.name}
              type: {data.type} 
              date: {data.date} 
            </div>
          )
        })}
      </>
    </div>
  )
}

export default HolidayCard
