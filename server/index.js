const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const path = require('path')
const root = path.resolve(__dirname, '..')

app.prepare()
    .then(() => {
        const server = express()
        const bodyParser = require('body-parser')
        
        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({ extended: false }))

        const exposeModules = modules => {
            modules.forEach(module => {
                server.use(
                    '/modules/' + module, 
                    express.static(path.join(path.join(root, 'node_modules'), module))
                )
            })
        }

        server.use('/public/', express.static(path.join(root, 'public')))

        exposeModules([
            'jquery',
            'semantic-ui-css',
            'datatables.net',
            'datatables.net-buttons',
            'datatables.net-se',
            'datatables.net-buttons-se',
            'jszip',
            'pdfmake',
        ])

        require('./api')(server, [
            'upload',
            'db',
        ])

        server.get('*', (req, res) => handle(req, res))

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((err) => {
        console.error(err.stack)
        process.exit(1)
    })