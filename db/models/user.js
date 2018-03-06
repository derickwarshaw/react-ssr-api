const bcrypt = require('bcrypt')

'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Incorrect email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.prototype.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if(err) { return callback(err) }

      callback(null, isMatch)
    })
  }

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10).then(function(hash) {
      user.password = hash
    })
  })

  User.beforeBulkCreate((users, options) => {
    for (const user of users) {
      const hash = bcrypt.hashSync(user.password, 10)
      user.password = hash
    }
  })

  return User;
};
