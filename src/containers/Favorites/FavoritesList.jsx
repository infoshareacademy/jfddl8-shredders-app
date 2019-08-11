import React, { Component } from 'react'

import List from '../../components/List'
import { getConcertsFromBase } from '../../services/fetchService'

class FavoritesList extends Component {
  state = {
    concerts: null,
    isFetching: false,
  }

  componentDidMount() {
    this.setState({ isFetching: true })

    getConcertsFromBase()
      .then(concerts => this.setState({
        concerts,
        isFetching: false
      }))
  }

  render() {
    const filteredConcerts =
      this.state.concerts &&
      this.state.concerts.filter(
        elem => elem.isFavorite === true
      )

    return (
      <div>
        {this.state.isFetching ? <div>Loading</div> : null}
        {filteredConcerts ? <List data={filteredConcerts} /> : null}
      </div>
    )
  }
}

export default FavoritesList
