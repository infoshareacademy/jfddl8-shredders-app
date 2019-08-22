import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import auth, { checkIfUSerIsLoggedInAsyncActionCreator } from './state/auth'
import concerts from './state/concerts'
import snackbars from './state/snackbars'
import errors from './state/errors'
import users from './state/users'


const reducer = combineReducers({
  auth,
  concerts,
  snackbars,
  errors,
  users
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

store.dispatch(checkIfUSerIsLoggedInAsyncActionCreator())
