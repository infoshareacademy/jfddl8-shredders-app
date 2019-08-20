import jwt from 'jsonwebtoken'
import { store } from '../store'
import { addErrorWithSnackActionCreator } from './errors'
import { fetchWithToken } from './users'


const API_KEY = 'AIzaSyAY8yO-AihhNCdcOpVSDcqNWmXs7U5wdVU'

const SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY
const SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY
const REFRESH_TOKEN_URL = 'https://identitytoolkit.googleapis.com/v1/token?key=' + API_KEY
const CHANGE_PASSWORD_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + API_KEY
const SAVE_USER_URL = 'https://jfddl8-shredders.firebaseio.com/users/'

const LOGGED_IN = 'auth/LOGGED_IN'
const LOGGED_OUT = 'auth/LOGGED_OUT'
const START_FETCHING = '/START_FETCHING'
const STOP_FETCHING = '/STOP_FETCHING'

const authFetch = (url, options) => {
  const dispatch = store.dispatch
  dispatch(startFetchingActionCreator())

  return fetch(url, options)
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        return Promise.reject(data)
      }

      return data
    })
    .then(data => {
      localStorage.setItem('idToken', data.idToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      dispatch(checkIfUSerIsLoggedInAsyncActionCreator())

      return data
    })
    .catch(error => {
      dispatch(addErrorWithSnackActionCreator(error))
      return error
    })
    .finally(() => dispatch(stopFetchingActionCreator()))

}

export const signInAsyncActionCreator = (email, password) => (dispatch, getState) => {
  dispatch(startFetchingActionCreator())
  return authFetch(
    SIGN_UP_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      })
    }
  )
    .then(data => {
      const user = jwt.decode(data.idToken)
      const key = user.user_id
      fetchWithToken(SAVE_USER_URL + key + '.json?', {
        method: 'PATCH',
        body: JSON.stringify(user)
      })
    })
}

export const logInAsyncActionCreator = (email, password) => (dispatch, getState) => {
  dispatch(startFetchingActionCreator())
  return authFetch(
    SIGN_IN_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  )
}

export const changePasswordAsyncActionCreator = (password) => (dispatch, getState) => {
  const idToken = getState().auth.idToken

  dispatch(startFetchingActionCreator())
  return authFetch(
    CHANGE_PASSWORD_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        idToken,
        password,
        returnSecureToken: true
      })
    }
  )
}

export const refreshTokenAsyncActionCreator = () => (dispatch, getState) => {

  return refreshToken()
    .then(data => {
      dispatch(checkIfUSerIsLoggedInAsyncActionCreator())

      return data
    })
    .catch(data => {
      return Promise.reject
    })

}
const refreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (refreshToken) {
    return fetch(
      REFRESH_TOKEN_URL,
      {
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      }
    )
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          return Promise.reject(data)
        }

        return data
      })
      .then(data => {
        localStorage.setItem('idToken', data.id_token)
        localStorage.setItem('refreshToken', data.refresh_token)
        return data
      })
  }
}


const checkIfTokenisValid = idToken => {
  if (!idToken) return false

  let decoded = null
  try {
    decoded = jwt.decode(idToken)
  } catch (error) {
    return false
  }

  if (!decoded) return false

  return (Number(decoded.exp) * 1000 > Date.now())
}

export const checkIfUSerIsLoggedInAsyncActionCreator = () => (dispatch, getState) => {
  const idToken = localStorage.getItem('idToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if (!checkIfTokenisValid(idToken) && refreshToken) {
    dispatch(refreshTokenAsyncActionCreator())

    return
  }

  if (idToken && refreshToken) {
    dispatch(loggedInActionCreator(idToken, refreshToken))
  } else {
    dispatch(loggedOutActionCreator())
  }

}

const loggedInActionCreator = (idToken, refreshToken) => ({
  type: LOGGED_IN,
  idToken,
  refreshToken,
  userData: jwt.decode(idToken)
})

const startFetchingActionCreator = () => ({ type: START_FETCHING })

const stopFetchingActionCreator = () => ({ type: STOP_FETCHING })

export const loggedOutActionCreator = () => {
  localStorage.setItem('idToken', '')
  localStorage.setItem('refreshToken', '')
  return { type: LOGGED_OUT }
}

const initialState = {
  isUserLoggedIn: false,
  userData: null,
  idToken: null,
  refreshToken: null,
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        userData: action.userData,
        isUserLoggedIn: true
      }
    case LOGGED_OUT:
      return {
        ...initialState
      }
    case 'broke-token':
      return {
        ...state,
        idToken: 'xxx'
      }
    case START_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case STOP_FETCHING:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}