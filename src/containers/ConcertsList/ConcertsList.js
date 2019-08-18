import React, { Component, Fragment } from 'react'

import List from '../../components/List'
import Filters from './Filters';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchs } from '../../state/concerts'

import withFetchService from '../../services/withFetchService'

const styles = {
  paper: { marginTop: 20, padding: '0px 10px 0 10px' },
  progress: { display: 'flex', justifyContent: 'center', marginTop: 30 },

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
        {this.state.isFetching ? <div style={styles.progress}><CircularProgress size={80} /></div> : null}
        {filteredConcerts ?
          <Paper style={styles.paper}>
            <Filters
              toggleFavorite={this.toggleFavorite}
              onChangeHanler={this.onChangeHanler}
              filters={this.state.filters}
            />
            <br />
            <hr />


            <List
              data={filteredConcerts}
              listWithDialog
              deleteConcert={this.props._deleteItem}
              toggleFavoriteInBase={this.props._toggleFavorite}
            />
          </Paper> : null}
      </Fragment>
    )
  }
}


export default withFetchService(
  'concerts',
  fetchs
)(ConcertsList)
