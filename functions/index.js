const functions = require("firebase-functions");

const express = require('express')
const cors = require('cors')
const { newUser, newBooking, getAllBookings, getOneBooking, updateBooking, deleteBooking } = require('./src/users')

const app = express()
app.use(cors())

//route here 
app.get('/bookings/:bookingId', getOneBooking)
app.get('/bookings', getAllBookings)

app.post('/users', newUser)
app.post('/bookings', newBooking)

app.patch('/bookings/:bookingId', updateBooking)
app.delete('/bookings/:bookingId', deleteBooking)


exports.app = functions.https.onRequest(app)
