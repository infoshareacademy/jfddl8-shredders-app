import React, { Component } from 'react'

import CanvasJSReact from '../../utlils/canvasjs.react'
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CustomerSatisfactionChart extends Component {
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
				yValueFormatString: "#,###' %'",
				dataPoints: [
					{ name: " Festyny", y: 11 },
					{ name: " Koncerty ", y: 50 },
					{ name: " Festiwale ", y: 27 },
					{ name: " Koncerty zagraniczne", y: 12 }
				]
			}]
		}
		return (
			<div>
				<CanvasJSChart options={options} />
			</div>
		);
	}
}

export default CustomerSatisfactionChart;   