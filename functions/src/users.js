const admin = require('firebase-admin')
const { connectFirestore } = require ('./firestore')

exports.newUser = (req, res) => {
    const db = connectFirestore()
    const newData = req.body
    db.collection('users').doc(newData.uid)
      .set(newData)
      .then(() => this.getUsers(res,res))
      .catch((err) => res.send('User not created'))
}

exports.getUsers = (req, res) => {
    const db = connectFirestore()
    db.collection('users').orderBy('iat','desc')
      .get()    
      .then(() => this.getUsers(res,res))
      .catch((err) => res.send('User not created'))
}