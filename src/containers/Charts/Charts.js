import React, {Component} from 'react'

import CanvasJSReact from '../../utlils/canvasjs.react'
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "Zadowolenie klientów"
			},
			subtitles: [{
				text: "77% to pozytywne opinie",
        verticalAlign: "center",
        horizontalAlign: "center",
				fontSize: 14,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: " Niezadowolony", y: 5 },
					{ name: " Bardzo niezadowolony", y: 11 },
					{ name: " Bardzo zadowolony", y: 50 },
					{ name: " Zadowolony", y: 27 },
					{ name: " Bez opinii", y: 7 }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
		);
	}
}

export default  Chart;   