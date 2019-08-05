import React from 'react'
import { Route } from 'react-router-dom'

import Router from './router/Router'
import Nav from './router/Nav'

const App = () => (
  <div>
    <Router>
      <Nav />
    </Router>
  </div>
)

export default App
