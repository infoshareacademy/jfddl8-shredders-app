import React from 'react'
import { Route } from 'react-router-dom'

import Router from './router/Router'
import Nav from './router/Nav'
import AddForm from './containers/AddForm';
import ConcertsList from './containers/ConcertsList/ConcertsList'

const App = () => (
  <div>
    <Router>
      <Nav />
      <Route path={'/add-form'} component={AddForm} />
      <Route path={'/concerts-list'} component={ConcertsList} />
    </Router>
  </div>
)

export default App
