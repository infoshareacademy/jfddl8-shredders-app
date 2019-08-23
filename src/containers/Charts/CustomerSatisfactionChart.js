import React, { Component } from 'react'

import CanvasJSReact from '../../utlils/canvasjs.react'
import withFetchService from '../../services/withFetchService'
import { fetchs } from '../../state/concerts'
import { isEqual, forEach } from 'lodash'

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CustomerSatisfactionChart extends Component {
  state = {
    concerts: {},
    chartData: [
      { name: " Festyny", y: 11 },
      { name: " Koncerty ", y: 50 },
      { name: " Festiwale ", y: 27 },
      { name: " Koncerty zagraniczne", y: 12 }
    ]
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
    this.setState({ chartData: dataToChart })
  }

  componentWillUpdate(nextProps, nextState) {

    if (!isEqual(nextProps._data, this.props._data)) {
      this.setChartData(nextProps._data)
    }
  }

  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Eventy w naszej aplikacji"
      },
      subtitles: [{
        verticalAlign: "center",
        horizontalAlign: "center",
        fontSize: 14,
        dockInsidePlotArea: true
      }],
      data: [{
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###''",
        dataPoints: this.state.chartData
      }]
    }
    return (
      <CanvasJSChart options={options} />
    );
  }
}



export default withFetchService(
  'concerts',
  fetchs
)(CustomerSatisfactionChart);   
