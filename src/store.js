import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import auth, { checkIfUSerIsLoggedInAsyncActionCreator } from './state/auth'
import concerts from './state/concerts'


const reducer = combineReducers({
  auth,
  concerts
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)


store.dispatch(checkIfUSerIsLoggedInAsyncActionCreator())
