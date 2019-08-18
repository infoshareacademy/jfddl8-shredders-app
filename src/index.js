import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './store'

import App from './App'
import Auth from './Auth'

ReactDOM.render(
  <Provider store={store}>
    <Auth>
      <App />
    </Auth>
  </Provider>,
  document.getElementById('root')
)
