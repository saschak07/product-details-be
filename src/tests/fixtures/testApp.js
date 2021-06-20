const {connect} = require('./db')
const product = require('../../routers/product')
const express = require('express')
const cors = require('cors')
/**
 * test app
 */
connect()
const app = express()
app.use(express.json())
app.use(cors())
app.use(product)

module.exports = app