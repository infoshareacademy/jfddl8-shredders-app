import React, { Component, Fragment } from 'react'

import List from '../../components/List'
import Filters from './Filters';

import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchs } from '../../state/concerts'

import withFetchService from '../../services/withFetchService'
import { mapObjectToArray } from '../../services/mapObjectToArray'

import { isEqual } from 'lodash'

const styles = {
  paper: {
    marginTop: 5, padding: '0px 10px 0 10px', borderRadius: '4px'
  },
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

  interval = null

  componentDidMount() {
    this.props._getData()

    this.interval = setInterval(this.liveUpdate, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  liveUpdate = () => {
    fetch('https://jfddl8-shredders.firebaseio.com/concertList/.json?auth=' + localStorage.getItem('idToken'))
      .then(r => r.json())
      .then(data => {
        if (!isEqual(mapObjectToArray(data), this.props._data))
          this.props._getData()
      })
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
      const isFavorite = this.state.filters.isFavorite ? (typeof el.isFavorite == 'object' && el.isFavorite.includes(this.props._userId)) : true
      const isBandMatch = el.band ? el.band.toLowerCase().includes(this.state.filters.band.toLowerCase()) : true
      const isDateMatch = el.date ? el.date.includes(this.state.filters.date) : true
      const isPlaceMatch = el.location ? el.location.toLowerCase().includes(this.state.filters.location.toLowerCase()) : true
      const isGenreMatch = this.state.filters.genre === 'all' || (el.genre ? el.genre.toLowerCase().includes(this.state.filters.genre.toLowerCase()) : true)

      return isFavorite && isBandMatch && isDateMatch && isGenreMatch && isPlaceMatch
    })


    return (
      <Fragment>
        {this.props._isFetching ? <div style={styles.progress}><CircularProgress size={80} /></div> : null}

        <Box style={styles.paper} boxShadow={3}>
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
              _userId={this.props._userId}
            />
            : null}
        </Box>
      </Fragment>
    )
  }
}

export default withFetchService(
  'concerts',
  fetchs
)(ConcertsList)
