import { store } from '../store'
import { refreshTokenAsyncActionCreator } from './auth'

export default (url, name, mapData) => {
  const GET = name + '/GET'

  const fetchWithToken = (url, options) => {
    const getState = store.getState
    const dispatch = store.dispatch

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
      .then(data => data)
      .catch(error => {
        alert(error)
        return error
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
  }

  const addAsyncActionCreator = (item, queryString = '') => (dispatch, getState) => {
    const auth = getState().auth
    if (auth.idToken) queryString = queryString + '&auth=' + auth.idToken

    return fetch(url + '.json?' + queryString,
      {
        method: 'POST',
        body: JSON.stringify(item)
      })

  }

  const toggleFavoriteAsyncActionCreator = (key, isFavorite, queryString = '') => (dispatch, getState) => {
    return fetchWithToken(url + key + '.json?' + queryString,
      {
        method: 'PATCH',
        body: JSON.stringify({
          isFavorite
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

  const initialState = {
    data: null
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET:
        return {
          ...state,
          data: action.data
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
      toggleFavoriteAsyncActionCreator
    }
  }
}