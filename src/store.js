import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import auth, { checkIfUSerIsLoggedInAsyncActionCreator } from './state/auth'
import concerts from './state/concerts'
import snackbras from './state/snackbars'


const reducer = combineReducers({
  auth,
  concerts,
  snackbras
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)


store.dispatch(checkIfUSerIsLoggedInAsyncActionCreator())
