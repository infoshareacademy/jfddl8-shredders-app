import React, { Fragment } from 'react'

import ListItem from './ListItem'
import PaginationPanel from './PaginationPanel/PaginationPanel'
import ListItemWithDialog from '../ListItemWithDialog'

const styles = {
  noResult: {
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    padding: 10
  }
}

class List extends React.Component {
  state = {
    pageLength: 10,
    concertsIndex: 0
  }

  concertsDivide = () => {
    let concertsToShow = []
    let arr = []
    this.props.data.forEach((concert, index) => {
      arr.push(concert)
      if (arr.length === this.state.pageLength || index === this.props.data.length - 1) {
        concertsToShow.push(arr)
        arr = []
      }
    })

    return { concertsToShow, paginationLength: Math.ceil(this.props.data.length / this.state.pageLength) }
  }

  componentDidMount() {
    this.concertsDivide()
  }

  changeConcertsIndex = num => {
    this.setState({ concertsIndex: num })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    const concertsToShow = this.concertsDivide().concertsToShow
    const paginationLength = this.concertsDivide().paginationLength

    return (
      <div>
        {concertsToShow && concertsToShow.length === 0 && <div style={styles.noResult}>No results, try with another filters!</div>}
        {concertsToShow && concertsToShow.length !== 0 && concertsToShow[this.state.concertsIndex].map(data => (
          <Fragment key={data.key}>
            {this.props.listWithDialog
              ?
              <ListItemWithDialog
                data={data}
                deleteConcert={this.props.deleteConcert}
                toggleFavoriteInBase={this.props.toggleFavoriteInBase}
              />
              :
              <ListItem data={data} />
            }
          </Fragment>
        ))}
        {paginationLength > 1
          ?
          <PaginationPanel
            paginationLength={paginationLength}
            changePage={this.changeConcertsIndex}
            currentPage={this.state.concertsIndex}
          />
          : null}
      </div>
    )
  }
}

export default List