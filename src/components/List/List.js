import React, { Fragment } from 'react'

import ListItem from './ListItem'
import PaginationPanel from './PaginationPanel/PaginationPanel'
import ListItemWithDialog from '../ListItemWithDialog'

class List extends React.Component {
  state = {
    pageLength: 10,
    concerts: this.props.data,
    paginationLength: 10,
    concertsToShow: null,
    concertsIndex: 0
  }

  concertsDivide = () => {
    let concertsToShow = []
    let arr = []
    this.state.concerts.forEach((concert, index) => {
      arr.push(concert)
      if (arr.length === this.state.pageLength || index === this.state.concerts.length - 1) {
        concertsToShow.push(arr)
        arr = []
      }
    })
    this.setState({ concertsToShow, paginationLength: Math.ceil(this.props.data.length / this.state.pageLength) })
  }

  componentDidMount() {
    this.concertsDivide()
  }

  changeConcertsIndex = num => {
    this.setState({ concertsIndex: num })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    return (
      <div>
        {this.state.concertsToShow && this.state.concertsToShow[this.state.concertsIndex].map(data => (
          <Fragment key={data.key}>
            {this.props.listWithDialog ? <ListItemWithDialog data={data} /> : <ListItem data={data} />}
          </Fragment>
        ))}
        <PaginationPanel
          paginationLength={this.state.paginationLength}
          changePage={this.changeConcertsIndex}
          currentPage={this.state.concertsIndex}
        />
      </div>
    )
  }
}

export default List