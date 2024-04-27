import '../../App.css'
import React from 'react'
import ShiftAttentionCard from './HomeCards/ShiftAttentionCard'
import ShiftViewCard from './HomeCards/ShiftViewCard'
import CreationCard from './HomeCards/CreationCard'
import HolidayCard from './HomeCards/HolidayCard'
import '../css/Home.css'

function Home() {
  return (
    <>
      <ShiftAttentionCard />
      <ShiftViewCard />
      <CreationCard />
      <HolidayCard />
    </>
  )
}

export default Home