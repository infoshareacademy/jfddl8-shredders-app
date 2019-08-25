import React from 'react'

import withFetchService from '../../services/withFetchService'
import { fetchs } from '../../state/concerts'
import ChartOfGenres from './components/ChartOfGenres'

import { Typography, Box } from '@material-ui/core'
import { forEach } from 'lodash'

const styles = {
  h2: {
    lineSpacing: 20,
    textAlign: 'center',
    margin: '4px auto',
    padding: '5px',
    borderRadius: '4px'
  },
  div: {
    margin: '20px auto',
    maxWidth: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  span: {
    color: '#d9a323',
    fontSize: '2rem'
  }
}

class Dashboard extends React.Component {
  state = {
    chartData: []
  }

  componentDidMount() {
    this.props._getData()
      .then(() => this.setChartData(this.props._data))
  }

  setChartData(concerts) {
    const countGenres = {}
    forEach(concerts, (concert) => {
      const genre = concert.genre.toLowerCase()
      countGenres[genre] = countGenres[genre] ? countGenres[genre] + 1 : 1
    })
    const dataToChart = []
    forEach(countGenres, (y, name) => {
      dataToChart.push([name, y])
    })
    this.setState({
      chartData: dataToChart
    })
  }

  render() {
    return (
      <Box style={styles.h2} boxShadow={3}>
        <img style={{ maxHeight: 300, maxWidth: '90vw', margin: '20px auto' }} src='https://i.ibb.co/rmsqMWV/logo-Music-Tripper1.png' alt='Music-Tripper' />
        <Typography variant={'h4'}>
          Znajdź wymażony koncert !
          </Typography>
        <Typography variant={'h6'}>
          Przeglądaj listę wydarzeń muzycznych spośród <span style={styles.span}>
            {this.props._data.length !== 0 ? this.props._data.length : null}
          </span> pozycji!
          </Typography>
        <Typography variant={'h6'}>
          Zobacz gdzie i kiedy gra Twój ulubiony zespół, oraz sprawdź cenę biletu.
          </Typography>
        <div style={styles.div}>
          <Typography variant='h6'>Gatunki muzyczne koncertów:</Typography>
          <ChartOfGenres chartData={this.state.chartData} />
        </div>
      </Box >
    )
  }
}


export default withFetchService(
  'concerts',
  fetchs
)(Dashboard)
