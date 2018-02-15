const mongo = require('mongodb')
const router = require('express').Router()
const { db } = require('./../../settings')

const find = (collection, query, show) => {
    return new Promise((resolve, reject) => {
        mongo.connect(db.uri + db.name)
            .then(client => {
                resolve(
                    client
                    .db(db.name)
                    .collection(collection)
                    .find(query, show)
                )
            })
            .catch(err => reject(err))
    })
}

const select = (collection, query, show) => {
    return new Promise((resolve, reject) => {
        find(collection, query, show)
            .then(records => {
                records.toArray((err, result) => {
                    if (err) reject(err)
                    else resolve(result)
                })
            })
            .catch(err => reject(err))
    })
}

const count = (collection, query) => {
    return new Promise((resolve, reject) => {
        find(collection, query, { _id: 1 })
            .then(records => {
                records.count((err, result) => {
                    if (err) reject(err)
                    else resolve(result)
                })
            })
            .catch(err => reject(err))
    })
}

router.post('/select', (req, res) => {
    
    /*
    POST '/api/db/select'
    Header:
        Content-Type: application/json
    Body:
        {
            "collection": "<collection_name>",
            "query": {
                "<key>": "<filter>",
                "<key>": "<filter>",
                ...
                "<key>": "<filter>"                
            },
            "show": {
                "<key>": 1,
                "<key>": 1,
                ...
                "<key>": 1                
            }
        }
    */

    const { collection, query, show } = req.body
    if (collection && query && show) {
        select(collection, query, show)
            .then(result => res.send(JSON.stringify(result, null, 1)))
            .catch(err => { 
                console.log(err)
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(400)
    }
})

router.post('/count', (req, res) => {

    /*
    POST '/api/db/count'
    Header:
        Content-Type: application/json
    Body:
        {
            "collection": "<collection_name>",
            "query": {
                "<key>": "<filter>",
                "<key>": "<filter>",
                ...
                "<key>": "<filter>"                
            }
        }
    */

    const { collection, query } = req.body
    if (collection && query) {
        count(collection, query)
            .then(result => res.send(result.toString()))
            .catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(400)
    }
})

module.exports = router