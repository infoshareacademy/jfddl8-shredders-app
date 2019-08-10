import React, { Component, Fragment } from 'react'

import List from '../../components/List'
import Filters from './Filters';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getConcertsFromBase, removeConcertsInBase } from '../../services/fetchService'

const styles = {
  paper: { marginTop: 20, padding: '0px 10px 0 10px' },
  progress: { display: 'flex', justifyContent: 'center', marginTop: 30 },
  filters: { display: 'flex', justifyContent: 'center' }
}

class ConcertsList extends Component {

  state = {
    concerts: null,
    isFetching: false,
    filters: {
      isFavorite: false,
      band: '',
      location: '',
      date: '',
      genre: '',
    }
  }

  onChangeHanler = (key) => {
    return (event) => {
      const filters = {
        ...this.state.filters,
        [key]: event.target.value
      }

      this.setState({ filters })
    }
  }

  componentDidMount() {
    this.getConcerts()
  }

  getConcerts = () => {
    this.setState({ isFetching: true })

    getConcertsFromBase()
      .then(concerts => this.setState({ concerts, isFetching: false }))
  }

  deleteConcert = key => {
    return removeConcertsInBase(key)
      .then(() => this.getConcerts())
  }

  toggleFavorite = () => {
    this.setState({ filters: { ...this.state.filters, isFavorite: !this.state.filters.isFavorite } })
  }

  render() {
    const filteredConcerts = this.state.concerts && this.state.concerts.filter(el => {
      const isFavorite = this.state.filters.isFavorite ? el.isFavorite : true
      const isBandMatch = el.band ? el.band.toLowerCase().includes(this.state.filters.band.toLowerCase()) : false
      const isDateMatch = el.date ? el.date.includes(this.state.filters.date) : false
      const isGenreMatch = el.genre ? el.genre.includes(this.state.filters.genre) : false
      const isPlaceMatch = el.location ? el.location.toLowerCase().includes(this.state.filters.location.toLowerCase()) : false

      return isFavorite && isBandMatch && isDateMatch && isGenreMatch && isPlaceMatch
    })
    return (
      <Fragment>
        {this.state.isFetching ? <div style={styles.progress}><CircularProgress size={80} /></div> : null}
        {filteredConcerts ?
          <Paper style={styles.paper}>
            <Filters
              style={styles.filters}
              toggleFavorite={this.toggleFavorite}
              onChangeHanler={this.onChangeHanler}
              filters={this.state.filters}
            />

            <List data={filteredConcerts} listWithDialog deleteConcert={this.deleteConcert} />
          </Paper> : null}
      </Fragment>
    )
  }
}

export default ConcertsList