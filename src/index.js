import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './store'

import App from './App'
import Auth from './Auth'
import Snackbar from './components/Snackbar/Snackbar'

ReactDOM.render(
  <Provider store={store}>
    <Auth>
      <App />
    </Auth>
    <Snackbar />
  </Provider>,
  document.getElementById('root')
)
