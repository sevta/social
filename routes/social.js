var express = require('express')
var router = express.Router()
var socialController = require('../controller/socialController')
var jwt = require('jsonwebtoken')
var Users = require('../models/users')
var checkAuth = require('../config/checkAuth')
 
router.get('/' , checkAuth.check , (req , res , next) => {
   const user = req.user
   res.send({messgae: 'bleh' , user: user})
})

module.exports = router