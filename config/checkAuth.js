var jwt = require('jsonwebtoken')
var Users = require('../models/users')

module.exports = {
   check: function(req , res , next) {
      var token = req.headers['x-access-token']
      if (!token) {
         return res.status(401).send({ auth: false , message: 'token needed' }) 
      } 
      jwt.verify(token , 'supersecret' , (err , decode) => {
         if (err) {
            return res.status(401).send({ auth: false , message: 'auth failed' })
         }
         Users.findById(decode.id , (err , user) => {
            if (err) {
               return res.status(500).send({ messgage: 'there was error finding users' })
            }
            if (!user) {
               return res.status(404).send({ messgae: 'Users not found' })
            }
            if (user) {
               res.send(user)
            }
         })
      })
   }
}