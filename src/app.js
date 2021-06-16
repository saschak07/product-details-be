/**
 * router consolidator, where different express routers are attached to the app
 *  the app.js is used finaly at index.js to startup express based backend
 *
 */
require('./db/mongoose')
const product = require('./routers/product')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(product)

module.exports = app