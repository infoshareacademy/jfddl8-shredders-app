import React, { Fragment } from 'react'

import ListItem from './ListItem'
import PaginationPanel from './PaginationPanel/PaginationPanel'
import ListItemWithDialog from '../ListItemWithDialog'
import { Typography } from '@material-ui/core';

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
    const concertsDivide = this.concertsDivide()
    const concertsToShow = concertsDivide.concertsToShow
    const paginationLength = concertsDivide.paginationLength
    const currentPage = paginationLength - 1 < this.state.concertsIndex ? 0 : this.state.concertsIndex
    return (
      <div>
        {
          concertsToShow &&
          concertsToShow.length === 0 &&
          <div style={styles.noResult}>
            <Typography>
              Nie znaleziono żadnych wyników, spróbuj ponownie.
              </Typography>
          </div>
        }
        {
          concertsToShow &&
          concertsToShow.length !== 0 &&
          concertsToShow[currentPage].map(data => (
            <Fragment key={data.key}>
              {this.props.listWithDialog
                ?
                <ListItemWithDialog
                  data={data}
                  deleteConcert={this.props.deleteConcert}
                  toggleFavoriteInBase={this.props.toggleFavoriteInBase}
                  _userId={this.props._userId}
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
            currentPage={currentPage}
          />
          : null}
      </div>
    )
  }
}

export default List
