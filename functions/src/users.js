const admin = require('firebase-admin')
const { connectFirestore } = require('./firestore')

// exports.getAllBookingsByEmail = (req, res) => {
//   const db = connectFirestore()
//   const {email} = req.query
//   db.collection('bookings').sortBy('date','desc')
//     .get(bookingsCollection) => {
//       let booking = doc.data()
//       booking.email = doc.email
//       return booking
//     })
//   .catch(err => res.status(500).send(err))
// }

exports.getAllBookingsByEmail = (req, res) => {
  const db = connectFirestore()
   db.collection(`bookings`)
    .orderBy('date','desc')
    .get()
    .then(bookingCollection => {
      const bookingArray = bookingCollection.docs.map(doc => {
        let booking = doc.data()
        booking.id = doc.id
        return booking
      })
      res.send(bookingArray)
    })
    .catch((err) => res.send({
      message: 'Bookings not showing'
    }))
}

exports.getOneBooking = (req, res) => {
  const db = connectFirestore()
  const { bookingId } = req.params
  console.log(bookingId)
  db.collection('bookings')
  .doc(bookingId)
  .get()
  .then(oneBooking => res.send(oneBooking.data()))
}

exports.newUser = (req, res) => {
  const db = connectFirestore()
  const newData = req.body
  console.log(newData)
  db.collection('users')
    .add(newData)
    .then(() => res.json('User successfully created'))
    .catch((err) => res.send('User not created'))
}

exports.newBooking = (req, res) => {
  const db = connectFirestore()
  const newData = req.body
  db.collection('bookings')
    .add(newData)
    .then(docRef => res.json(docRef))
    .catch((err) => res.send( err + 'Error creating new booking'))
}

exports.updateBooking = (req, res) => {
  const db = connectFirestore()
  const updateInfo = req.body
  db.collection('bookings').doc(req.params.bookingId)
    .update(updateInfo)
    .then(() => this.getOneBooking(req, res))
    .catch((err) => res.send('Error updating this booking'))

}

exports.deleteBooking = (req, res) => {
  const db = connectFirestore()
  const { bookingId } = req.params
  db.collection('bookings').doc(bookingId)
    .delete()
    .then(() => res.send('Deleted booking successfully'))
    .catch((err) => res.send('Error deleting booking'))
}


// exports.getUsers = (req, res) => {
//     const db = connectFirestore()
//     db.collection('users').orderBy('iat','desc')
//       .get()
//       .then(() => this.getUsers(res,res))
//       .catch((err) => res.send('User not created'))
// }
