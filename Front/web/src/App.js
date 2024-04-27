import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Notifications from './components/pages/Notifications';
import HolidayScreen from './components/pages/HolidayScreen';
import OvertimeScreen from './components/pages/OvertimeScreen';
import SwapsScreen from './components/pages/SwapsScreen';
import ViewerScreen from './components/pages/ViewerScreen';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="MainContent">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/holidays' element={<HolidayScreen />} />
            <Route path='/overtime' element={<OvertimeScreen />} />
            <Route path='/swaps' element={<SwapsScreen />} />
            <Route path='/viewer' element={<ViewerScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;