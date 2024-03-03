import '../../App.css'
import React from 'react'
import Header from '../Header'
import ShiftAttentionCard from './cards/ShiftAttentionCard'
import ShiftViewCard from './cards/ShiftViewCard'
import CreationCard from './cards/CreationCard'
import HolidayCard from './cards/HolidayCard'
import './Home.css'

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