import * as React from 'react';
import { ColumnChart } from 'react-chartkick'
import 'chart.js'

const ChartOfGenres = (props) => {
  const chartData = props.chartData

  return (
    <ColumnChart width='80%' data={chartData} />
  );
}

export default ChartOfGenres

