import React from 'react'

import withFetchService from '../../services/withFetchService'
import { fetchs } from '../../state/concerts'

import { Typography, Box } from '@material-ui/core'
import { isEqual, forEach } from 'lodash'

const styles = {
  h2: {
    textAlign: 'center',
    margin: '20px auto',
    maxWidth: 1000
  },
  div: {
    maxHeight: 200,
    margin: '50px',
    display: 'flex',
    justifyContent: 'center'
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px auto',
    padding: '2%',
    position: 'relative',
    borderRadius: '4px',
  },
  span: {
    color: 'red',
    fontSize: '2rem'
  }
}

class Dashboard extends React.Component {
  state = {
    chartData: []
  }

  componentDidMount() {
    this.props._getData()
  }

  setChartData(concerts) {
    const countGenres = {}
    forEach(concerts, (concert) => {
      const genre = concert.genre.toLowerCase()
      countGenres[genre] = countGenres[genre] ? countGenres[genre] + 1 : 1
    })
    const dataToChart = []
    forEach(countGenres, (y, name) => {
      dataToChart.push({ name, y })
    })
    this.setState({
      chartData: dataToChart
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps._data, this.props._data)) {
      this.setChartData(nextProps._data)
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <Box style={styles.box} boxShadow={3}>
        <div>
          <Typography variant={'h4'} style={styles.h2}>
            <img style={{ maxHeight: 300, maxWidth: '90vw' }} src='https://i.ibb.co/rmsqMWV/logo-Music-Tripper1.png' alt='Music-Tripper' />
            <br />
            <br />
            Znajdź wymażony koncert !
        </Typography>
          <Typography variant={'h6'} style={styles.h2}>
            Przeglądaj listę wydarzeń muzycznych spośród <span style={styles.span}>
              {this.props._data.length !== 0 ? this.props._data.length : null}
            </span> pozycji!
            <br />
            Zobacz gdzie i kiedy gra Twój ulubiony zespół, oraz sprawdź cenę biletu.
        </Typography>
        </div>
        <div style={styles.div}>

        </div>
      </Box >
    )
  }
}

export default withFetchService(
  'concerts',
  fetchs
)(Dashboard)
