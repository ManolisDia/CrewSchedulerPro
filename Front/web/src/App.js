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
import WebSocketProvider from './Hooks/WebSocketProvider';

function App() {
  return (
    <Router>
      <WebSocketProvider>
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
      </WebSocketProvider>
    </Router>
  );
}

export default App;