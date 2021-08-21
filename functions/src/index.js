const admin = require('firebase-admin')
const { connectFirestore } = require('./firestore')

exports.getAllBookings = (req, res) => {
  const db = connectFirestore()
  db.collection('bookings')
    .get()
    .then((collection) => {
      let allBookings = []
      collection.forEach((doc) => {
        let booking = doc.data()
        booking.id = doc.id
        allBookings.push(booking)
      })
      res.send(allBookings)
    })
    .catch((err) => res.send('Error retrieving bookings'))
}

exports.getOneBooking = (req, res) => {
  const db = connectFirestore()
  const { bookingId } = req.params
  db.collection('bookings')
  .doc(bookingId)
  .get()
  .then(oneBooking => res.send(oneBooking.data()))
}

exports.newUser = (req, res) => {
  const db = connectFirestore()
  const newData = req.body
  db.collection('users')
    .add(newData)
    .then(() => res.send('User successfully created'))
    .catch((err) => res.send('User not created'))
}

exports.newBooking = (req, res) => {
  const db = connectFirestore()
  const newData = req.body
  db.collection('bookings')
    .add(newData)
    .then(() => this.getAllBookings(req, res))
    .catch((err) => res.send('Error creating new booking'))
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
