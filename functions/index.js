const functions = require("firebase-functions");

const express = require('express')
const cors = require('cors')
const { createUser } = require('./src/bookings')

const app = express()
app.use(cors())

//route here 
app.post('/users/:email', createUser)


exports.app = functions.https.onRequest(app)
