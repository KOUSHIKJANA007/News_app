import './App.css';

import React, { useState } from 'react'
import NavBer from './components/NavBer';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 12
  const apikey = process.env.REACT_APP_NEWS_API_KEY
  const [progress, setProgress] = useState(0)
  return (
    <div>
      <Router>
        <NavBer />
        <LoadingBar color='#f11946' height={3} progress={progress} />
        <Routes>
          <Route exact path='/general' element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={pageSize} country="in" catagory="general" />} />
          <Route exact path='/business' element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={pageSize} country="in" catagory="business" />} />
          <Route exact path='/entertainment' element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={pageSize} country="in" catagory="entertainment" />} />
          <Route exact path='/health' element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={pageSize} country="in" catagory="health" />} />
          <Route exact path='/science' element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={pageSize} country="in" catagory="science" />} />
          <Route exact path='/technology' element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={pageSize} country="in" catagory="technology" />} />
          <Route exact path='/sports' element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={pageSize} country="in" catagory="sports" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
