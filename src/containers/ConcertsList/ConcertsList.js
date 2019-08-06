import React, { Component } from 'react'

import List from '../../components/List'
import Paper from '@material-ui/core/Paper';

import { getConcertsFromBase } from '../../services/fetchService'

const styles = {
  paper: { marginTop: 20, padding: '0px 10px 0 10px' }
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
      <Paper style={styles.paper}>
        {this.state.isFetching ? <div>Loading</div> : null}
        {this.state.concerts ? <List data={this.state.concerts} /> : null}
      </Paper>
    )
  }
}

export default ConcertsList