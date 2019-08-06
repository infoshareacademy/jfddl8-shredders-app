import React from 'react'
import { Route } from 'react-router-dom'

import Router from './router/Router'
import Nav from './router/Nav'
import Chart from './Charts'

const App = () => (
  <div>
    
    <Router>
      <Nav />
    </Router>
    <Chart></Chart>
  </div>
)



export default App
