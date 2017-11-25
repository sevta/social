var express =  require('express')
var router = express.Router()
var Users = require('../models/users')
var Seeder = require('../seeder')
var userController = require('../controller/userController')

router.get('/' , (req , res) => {res.send('hay test ya')})
router.post('/register' , userController.register)
router.post('/login' , userController.login)

module.exports = router