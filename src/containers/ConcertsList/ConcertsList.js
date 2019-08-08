import React, { Component, Fragment } from 'react'

import List from '../../components/List'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getConcertsFromBase } from '../../services/fetchService'

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
    this.setState({ isFetching: true })

    getConcertsFromBase()
      .then(concerts => this.setState({ concerts, isFetching: false }))

  }

  render() {
    return (
      <Fragment>
        {this.state.isFetching ? <div style={styles.progress}><CircularProgress size={80} /></div> : null}
        {this.state.concerts ? <Paper style={styles.paper}>
          <List data={this.state.concerts} listWithDialog />
        </Paper> : null}
      </Fragment>
    )
  }
}

export default ConcertsList