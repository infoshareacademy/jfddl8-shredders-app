import React, { Component } from 'react'

import List from '../../components/List'
import { getConcertsFromBase } from '../../services/fetchService'

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
      <div>
        {this.state.isFetching ? <div>Loading</div> : null}
        {this.state.concerts ? <List data={this.state.concerts} /> : null}
      </div>
    )
  }
}

export default ConcertsList