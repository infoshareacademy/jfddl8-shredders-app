import React from 'react'
import { connect } from 'react-redux'

const withFetchService = (name, fetchActions) => (InnerComponent) => {
  const WithFetchService = props => <InnerComponent {...props} />

  const mapStateToProps = state => ({
    _data: state[name].data
  })

  const mapDispatchToProps = dispatch => ({
    _getData: () => dispatch(fetchActions.getAsyncActionCreator()),
    _deleteItem: (key) => dispatch(fetchActions.removeAsyncActionCreator(key)),
    _addItem: (item) => dispatch(fetchActions.addAsyncActionCreator(item)),
    _toggleFavorite: (key, isFavrotire) => dispatch(fetchActions.toggleFavoriteAsyncActionCreator(key, isFavrotire))
  })


  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithFetchService)
}

export default withFetchService