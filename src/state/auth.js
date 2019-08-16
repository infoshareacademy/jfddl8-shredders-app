import jwt from 'jsonwebtoken'

const API_KEY = 'AIzaSyAY8yO-AihhNCdcOpVSDcqNWmXs7U5wdVU'

const SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY
const SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY
const REFRESH_TOKEN_URL = 'https://identitytoolkit.googleapis.com/v1/token?key=' + API_KEY

const LOGGED_IN = 'auth/LOGGED_IN'
const LOGGED_OUT = 'auth/LOGGED_OUT'

export const signInAsyncActionCreator = (email, password) => (dispatch, getState) => {
  return fetch(
    SIGN_UP_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
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
      localStorage.setItem('idToken', data.idToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      dispatch(checkIfUSerIsLoggedInAsyncActionCreator())

      return data
    })
    .catch(data => {
    })
}

export const logInAsyncActionCreator = (email, password) => (dispatch, getState) => {
  return fetch(
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
    .catch(data => {
    })
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

export const loggedOutActionCreator = () => ({ type: LOGGED_OUT })

const initialState = {
  isUserLoggedIn: false,
  userData: null,
  idToken: null,
  refreshToken: null
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
    default:
      return state
  }
}