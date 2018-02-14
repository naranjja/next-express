const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const path = require('path')
const MODULES = path.join(path.resolve(__dirname, '..'), 'node_modules')
const PUBLIC = path.join(path.resolve(__dirname, '..'), 'public')

app.prepare()
    .then(() => {
        const server = express()

        server.use('/public/', express.static(PUBLIC))
        server.use('/modules/semantic-ui-css', express.static(path.join(MODULES, 'semantic-ui-css')))
        server.use('/modules/datatables.net-se', express.static(path.join(MODULES, 'datatables.net-se')))

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