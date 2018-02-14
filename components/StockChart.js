import Highstock from 'react-highcharts/ReactHighstock'
import fetch from 'isomorphic-unfetch'

const config = {
    credits: {
        enabled: false
    },
    rangeSelector: {
        selected: 1
    },
    title: {
        text: 'Stock chart title'
    },
    series: [{}]
}

class StockChart extends React.Component {
    componentDidMount () {
        const chart = this.refs.chart.getChart()
        fetch('http://localhost:3000/public/sample-stock-data.json')
            .then(response => response.json())
            .then(data => {
                chart.series[0].name = 'Series name'
                chart.series[0].setData(data)
            })
    }
    render () {
        return (
            <Highstock config={config} ref="chart" />
        )
    }
}

export default StockChart