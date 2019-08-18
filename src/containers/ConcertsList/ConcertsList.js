import React, { Component, Fragment } from 'react'

import List from '../../components/List'
import Filters from './Filters';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchs } from '../../state/concerts'

import withFetchService from '../../services/withFetchService'

const styles = {
  paper: { marginTop: 20, padding: '0px 10px 0 10px' },
  progress: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'gray',
    opacity: 0.7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    zIndex: 10000
  }
}

class ConcertsList extends Component {

  state = {
    isFetching: false,
    filters: {
      isFavorite: false,
      band: '',
      location: '',
      date: '',
      genre: 'all',
    }
  }

  componentDidMount() {
    this.props._getData()
  }

  onChangeHanler = (key) => {
    return (event) => {

      const filters = {
        ...this.state.filters,
        [key]: event.target.value.toLowerCase()
      }

      this.setState({ filters })
    }
  }

  toggleFavorite = () => {
    this.setState({ filters: { ...this.state.filters, isFavorite: !this.state.filters.isFavorite } })
  }

  render() {
    const filteredConcerts = this.props._data && this.props._data.filter(el => {
      const isFavorite = this.state.filters.isFavorite ? el.isFavorite : true
      const isBandMatch = el.band ? el.band.toLowerCase().includes(this.state.filters.band.toLowerCase()) : true
      const isDateMatch = el.date ? el.date.includes(this.state.filters.date) : true
      const isPlaceMatch = el.location ? el.location.toLowerCase().includes(this.state.filters.location.toLowerCase()) : true
      const isGenreMatch = this.state.filters.genre === 'all' || (el.genre ? el.genre.toLowerCase().includes(this.state.filters.genre.toLowerCase()) : true)

      return isFavorite && isBandMatch && isDateMatch && isGenreMatch && isPlaceMatch
    })
    return (
      <Fragment>
        {this.props._isFetching ? <div style={styles.progress}><CircularProgress size={80} /></div> : null}

        <Paper style={styles.paper}>
          <Filters
            toggleFavorite={this.toggleFavorite}
            onChangeHanler={this.onChangeHanler}
            filters={this.state.filters}
          />
          <br />
          <hr />

          {filteredConcerts ?
            <List
              data={filteredConcerts}
              listWithDialog
              deleteConcert={this.props._deleteItem}
              toggleFavoriteInBase={this.props._toggleFavorite}
            />
            : null}
        </Paper>
      </Fragment>
    )
  }
}


export default withFetchService(
  'concerts',
  fetchs
)(ConcertsList)
