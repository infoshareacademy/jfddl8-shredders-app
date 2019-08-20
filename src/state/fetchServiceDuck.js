import { store } from '../store'
import { refreshTokenAsyncActionCreator } from './auth'
import { addSnackbarActionCreator } from './snackbars'
import { addErrorWithSnackActionCreator } from './errors'

export default (url, name, mapData, withSnackbars) => {
  const GET = name + '/GET'
  const START_FETCHING = name + '/START_FETCHING'
  const STOP_FETCHING = name + '/STOP_FETCHING'

  const fetchWithToken = (url, options) => {
    const getState = store.getState
    const dispatch = store.dispatch

    dispatch(startFetchingActionCreator())

    const getUrlWithToken = () => {
      const auth = getState().auth
      if (auth.idToken) return url + '&auth=' + auth.idToken

      return url
    }
    return fetch(getUrlWithToken(), options)
      .then(r => {
        if (r.status === 401) {
          return Promise.reject()
        }
        return r
      })
      .catch((r) => {
        return dispatch(refreshTokenAsyncActionCreator())
          .catch(() => Promise.reject(r))
          .then(() => fetch(getUrlWithToken(), options))
      })
      .then(r => r.json())
      .then(data => {
        if (data && data.error) return Promise.reject

        return data
      })
      .then(data => {
        return data
      })
      .catch(error => {
        addErrorWithSnackActionCreator(error)
        return error
      })
      .finally((data) => {
        dispatch(stopFetchingActionCreator())
        return data
      })
  }


  const getAsyncActionCreator = (queryString = '') => (dispatch, getState) => {

    fetchWithToken(url + '.json?' + queryString)
      .then(data => {
        const mappedData = mapData ? mapData(data) : data
        dispatch(getActionCreator(mappedData))
      })
  }

  const removeAsyncActionCreator = (key, queryString = '') => (dispatch, getState) => {

    return fetchWithToken(url + key + '.json?' + queryString,
      {
        method: 'DELETE',
      })
      .then((r) => {
        dispatch(getAsyncActionCreator())
        return r
      })
      .then((data) => {
        if (withSnackbars) dispatch(addSnackbarActionCreator('Removed', 'green'))
        return data
      })
  }

  const addAsyncActionCreator = (item, queryString = '') => (dispatch, getState) => {
    const auth = getState().auth
    if (auth.idToken) queryString = queryString + '&auth=' + auth.idToken

    return fetchWithToken(url + '.json?' + queryString,
      {
        method: 'POST',
        body: JSON.stringify(item)
      })
      .then((data) => {
        if (withSnackbars) dispatch(addSnackbarActionCreator('Added', 'green'))
        return data
      })
  }

  const toggleFavoriteAsyncActionCreator = (key, isFavorite, queryString = '') => (dispatch, getState) => {
    const userId = getState().auth.userData.user_id

    const favoriteList = (
      typeof isFavorite !== 'object' ?
        [userId]
        :
        isFavorite.includes(userId) ?
          isFavorite.filter(user => user !== userId)
          :
          [...isFavorite, userId]
    )

    return fetchWithToken(url + key + '.json?' + queryString,
      {
        method: 'PATCH',
        body: JSON.stringify({
          isFavorite: favoriteList
        })
      })
      .then((r) => {
        dispatch(getAsyncActionCreator())
        return r
      })
  }

  const getActionCreator = (data) => ({
    type: GET,
    data
  })

  const startFetchingActionCreator = () => ({ type: START_FETCHING })

  const stopFetchingActionCreator = () => ({ type: STOP_FETCHING })

  const initialState = {
    data: null,
    isFetching: false,
    isError: false
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET:
        return {
          ...state,
          data: action.data
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

  return {
    reducer,
    fetchs: {
      getAsyncActionCreator,
      removeAsyncActionCreator,
      addAsyncActionCreator,
      toggleFavoriteAsyncActionCreator,
    },
    fetchWithToken
  }
}