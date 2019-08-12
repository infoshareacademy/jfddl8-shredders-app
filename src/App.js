import React from 'react'
import { Route } from 'react-router-dom'

import './main.css'

import Router from './router/Router'
import Nav from './router/Nav'
import AddForm from './containers/AddForm'
import ConcertsList from './containers/ConcertsList/ConcertsList'

import Dashboard from './containers/Dashboard'


const App = () => (
  <div>
    
    <Router>
      <Nav />
      <Route path={'/'} component={Dashboard} exact/>
      <Route path={'/dashboard'} component={Dashboard} />
      <Route path={'/add-form'} component={AddForm} />
      <Route path={'/concerts-list/:concertKey?'} component={ConcertsList} />
    </Router>
  </div>
)



export default App
