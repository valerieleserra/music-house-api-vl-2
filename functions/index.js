const functions = require("firebase-functions");

const express = require('express')
const cors = require('cors')
const { newUser } = require('./src/users')

const app = express()
app.use(cors())

//route here 
app.post('/users', newUser)
app.get('/users', getUsers)


exports.app = functions.https.onRequest(app)
