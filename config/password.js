var bcrypt = require('bcrypt')

module.exports = {
   hash: function(userpassword) {
      return bcrypt.hashSync(userpassword , 10)
   },

   check: function(userpassword , hashpasword , cb) {
      return bcrypt.compare(userpassword , hashpasword).then(
         cb()
      )
   }
}