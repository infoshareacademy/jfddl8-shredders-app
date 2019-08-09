import React, { Component, Fragment } from 'react'

import List from '../../components/List'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getConcertsFromBase, removeConcertsInBase } from '../../services/fetchService'

const styles = {
  paper: { marginTop: 20, padding: '0px 10px 0 10px' },
  progress: { display: 'flex', justifyContent: 'center', marginTop: 30 }
}

class ConcertsList extends Component {

  state = {
    concerts: null,
    isFetching: false,
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

  render() {
    const filteredConcerts = this.state.concerts
    return (
      <Fragment>
        {this.state.isFetching ? <div style={styles.progress}><CircularProgress size={80} /></div> : null}
        {filteredConcerts ? <Paper style={styles.paper}>
          <List data={filteredConcerts} listWithDialog deleteConcert={this.deleteConcert} />
        </Paper> : null}
      </Fragment>
    )
  }
}

export default ConcertsList