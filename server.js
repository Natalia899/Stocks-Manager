const express = require('express')
const api = require('./server/routes/api')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/StocksDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api)

const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})