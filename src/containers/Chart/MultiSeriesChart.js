import React, {Component} from 'react'

import CanvasJSReact from '../../utlils/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class MultiSeriesChart extends Component {	
	render() {
		const options = {
				animationEnabled: true,	
				title:{
					text: "Eventy w naszej bazie"
				},
				axisY : {
					title: "Ilość eventów",
					includeZero: false
				},
				toolTip: {
					shared: true
				},
				data: [{
					type: "spline",
					name: "2018",
					showInLegend: true,
					dataPoints: [
						{ y: 155, label: "Styczeń" },
						{ y: 150, label: "Luty" },
						{ y: 152, label: "Marzec" },
						{ y: 148, label: "Kwiecień" },
						{ y: 142, label: "Maj" },
						{ y: 150, label: "Czerwiec" },
						{ y: 146, label: "Lipiec" },
						{ y: 149, label: "Sierpień" },
						{ y: 153, label: "Wrzesień" },
						{ y: 158, label: "Październik" },
						{ y: 154, label: "Listopad" },
						{ y: 150, label: "Grudzień" }
					]
				},
				{
					type: "spline",
					name: "2017",
					showInLegend: true,
					dataPoints: [
						{ y: 142, label: "Styczeń" },
						{ y: 146, label: "Luty" },
						{ y: 139, label: "Marzec" },
						{ y: 143, label: "Kwiecień" },
						{ y: 153, label: "Maj" },
						{ y: 155, label: "Czerwiec" },
						{ y: 162, label: "Lipiec" },
						{ y: 168, label: "Sierpień" },
						{ y: 155, label: "Wrzesień" },
						{ y: 140, label: "Październik" },
						{ y: 135, label: "Listopad" },
						{ y: 139, label: "Grudzień" }
					]
				}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
export default MultiSeriesChart; 