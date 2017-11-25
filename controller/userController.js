var Users = require('../models/users')
var password = require('../config/password')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

module.exports = {
   register: function(req , res , next) {
      Users.findOne({username: req.body.username} , (err , user) => {
         if (user) {
            console.log('user name has been exist')
            res.status(400).send({ message: 'Username has been exist , try other name :(' })
         } else {
            req.checkBody('username' , 'cannot be empty').notEmpty()
            req.checkBody('email' , 'email must be valid').isEmail()
            req.checkBody('email' , 'cannot be empty').notEmpty()
            req.checkBody('password' , 'cannot be empty').notEmpty()
            req.checkBody('password2' , 'password didnt match').equals(req.body.password)
            
            var error = req.validationErrors()
            
            if (error) {
               console.log(error)
               res.status(400).json({ message: error })
            } else {
               var newuser = new Users({
                  username: req.body.username,
                  email: req.body.email,
                  password: password.hash(req.body.password),
               })
               newuser.save((err , result) => {
                  if (err) { 
                     console.log(err)
                  }
                  console.log(user)
                  res.status(200).send({ message: 'success created users' })
               })
            }
         }
      })
   },

   login: function(req , res , next) {      
      Users.findOne({username: req.body.username} , (err , user) => {
         if (!user) {
            res.status(400).send({
               message: 'User Not Found'
            })
         } else {
            const validPwd = password.check(req.body.password , user.password)
            if (!validPwd) {
               res.status(400).send({
                  message: 'Password Maybe Wrong :( try other one'
               })
            } else {
               let token = jwt.sign({user: user , id: user._id} , 'supersecret' , {
                  expiresIn: 1440
               })
               res.status(200).send({
                  message: 'Success Login',
                  token: token
               })

            }
         }
      })
   }
}