var bcrypt = require('bcrypt')

module.exports = {
   hash: function(userpassword) {
      return bcrypt.hashSync(userpassword , 10)
   },

   check: function(userpassword , hashpasword) {
      return bcrypt.compareSync(userpassword , hashpasword)
   }
}