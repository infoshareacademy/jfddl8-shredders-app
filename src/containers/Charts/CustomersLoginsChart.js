import React, { Component } from 'react'

import CanvasJSReact from '../../utlils/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CustomersLoginsChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "Liczba nowych Music Tripperów"
			},
			axisY: {
				title: "Konta w serwisie",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			data: [{
				type: "spline",
				name: "2019.08.05 - 2019.08.11",
				showInLegend: true,
				dataPoints: [
					{ y: 155, label: "Poniedziałek" },
					{ y: 150, label: "Wtorek" },
					{ y: 152, label: "Środa" },
					{ y: 148, label: "Czwartek" },
					{ y: 142, label: "Piątek" },
					{ y: 150, label: "Sobota" },
					{ y: 146, label: "Niedziela" }
				]
			},
			{
				type: "spline",
				name: "2019.07.29 - 2019.08.04",
				showInLegend: true,
				dataPoints: [
					{ y: 142, label: "Poniedziałek" },
					{ y: 146, label: "Wtorek" },
					{ y: 139, label: "Środa" },
					{ y: 143, label: "Czwartek" },
					{ y: 153, label: "Piątek" },
					{ y: 155, label: "Sobota" },
					{ y: 162, label: "Niedziela" }
				]
			}]
		}

		return (
			<div>
				<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default CustomersLoginsChart; 