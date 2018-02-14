import fetch from 'isomorphic-unfetch'
import $ from 'jquery'

$.DataTable = require('datatables.net-se')

const columns = [{
        title: 'Name',
        width: 120,
        data: 'name'
    },
    {
        title: 'Nickname',
        width: 180,
        data: 'nickname'
    }
]

class Table extends React.Component { 
    componentDidMount() {
        fetch('http://localhost:3000/public/sample-table-data.json')
            .then(response => response.json())
            .then(data => {
                $(this.refs.main).DataTable({
                    data,
                    columns,
                    ordering: false,
                    bDestroy: true,
                    autoWidth: false,
                    bLengthChange: false,
                    bInfo: false,
                    lengthChange: false,
                    pageLength: 10,
                 })
            })
    }
    componentWillUnmount() {
       $('.data-table-wrapper')
           .find('table')
           .DataTable()
           .destroy(true)
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        return (
            <div>
                <link rel="stylesheet" href="/modules/datatables.net-se/css/dataTables.semanticui.css" />
                <table className="ui celled table" ref="main" />
            </div>
        )
    }
}

export default Table