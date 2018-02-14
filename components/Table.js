import fetch from 'isomorphic-unfetch'

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
                const table = $(this.refs.table).DataTable({
                    data,
                    columns,
                    ordering: false,
                    bDestroy: true,
                    autoWidth: false,
                    bLengthChange: false,
                    bInfo: false,
                    lengthChange: false,
                    pageLength: 10,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ]
                })
                table.buttons().container().appendTo($('div.eight.column:eq(0)', table.table().container()))
            })                
    }
    componentWillUnmount() {
        $(this.refs.table)
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
                <link rel="stylesheet" href="/modules/datatables.net-buttons-se/css/buttons.semanticui.min.css" />

                <script type="text/javascript" src="/modules/jquery/dist/jquery.min.js"></script>

                <script type="text/javascript" src="/modules/datatables.net/js/jquery.dataTables.js"></script>

                <script type="text/javascript" src="/modules/datatables.net-se/js/dataTables.semanticui.js"></script>

                <script type="text/javascript" src="/modules/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
                <script type="text/javascript" src="/modules/datatables.net-buttons/js/buttons.html5.min.js"></script>
                <script type="text/javascript" src="/modules/datatables.net-buttons/js/buttons.colVis.min.js"></script>
                <script type="text/javascript" src="/modules/datatables.net-buttons-se/js/buttons.semanticui.min.js"></script>

                <script type="text/javascript" src="/modules/jszip/dist/jszip.min.js"></script>
                <script type="text/javascript" src="/modules/pdfmake/build/pdfmake.min.js"></script>
                <script type="text/javascript" src="/modules/pdfmake/build/vfs_fonts.js"></script>

                <table className="ui celled table" ref="table" />
            </div>
        )
    }
}

export default Table