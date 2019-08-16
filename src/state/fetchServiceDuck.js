export default (url, name, mapData) => {
  const GET = name + '/GET'

  const getAsyncActionCreator = (queryString = '') => (dispatch, getState) => {
    const auth = getState().auth
    if (auth.idToken) queryString = queryString + '&auth=' + auth.idToken

    fetch(url + '.json?' + queryString)
      .then(r => r.json())
      .then(data => {
        const mappedData = mapData ? mapData(data) : data
        dispatch(getActionCreator(mappedData))
      })
  }

  const removeAsyncActionCreator = (key, queryString = '') => (dispatch, getState) => {
    const auth = getState().auth
    if (auth.idToken) queryString = queryString + '&auth=' + auth.idToken

    return fetch(url + key + '.json?' + queryString,
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
    const auth = getState().auth
    if (auth.idToken) queryString = queryString + '&auth=' + auth.idToken

    return fetch(url + key + '.json?' + queryString,
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