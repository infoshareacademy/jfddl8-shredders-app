import React from 'react'
import { Route } from 'react-router-dom'

import Router from './router/Router'
import Nav from './router/Nav'
import AddForm from './containers/AddForm';
import ConcertsList from './containers/ConcertsList/ConcertsList'
import FavoritesList from './containers/Favorites';

const App = () => (
  <div>
    <Router>
      <Nav />
      <Route path={'/add-form'} component={AddForm} />
      <Route path={'/concerts-list'} component={ConcertsList} />
      <Route path={'/favorites'} component={FavoritesList} />
    </Router>
  </div>
)

export default App
