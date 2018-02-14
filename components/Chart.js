import Highcharts from 'react-highcharts'
import fetch from 'isomorphic-unfetch'

const config = {
    credits: {
        enabled: false
    },
    title: {
        text: 'Chart title'
    },
    series: [{}]
  }

class Chart extends React.Component {
    componentDidMount () {
        const chart = this.refs.chart.getChart()
        fetch('http://localhost:3000/public/sample-chart-data.json')
            .then(response => response.json())
            .then(data => {
                chart.series[0].name = 'Series name'
                chart.series[0].setData(data)
            })
    }
    render () {
        return (
            <Highcharts config={config} ref="chart" />
        )
    }
}

export default Chart