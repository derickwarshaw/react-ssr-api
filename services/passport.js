const passport = require('passport')
const models = require('../db/models')
const config = require('../config/env_config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

//Create local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this username/password, call done with user if successful,
  // otherwise done with false.
  models.User.findOne({where: { email: email } })
  .then(user => {
    if(!user) { return done(null, false) }
    // Compare passwords.
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err) }
      if(!isMatch) { return done(null, false) }

      return done(null, user)
    })
  })
  .catch(error => {
    return done(error)
  })
})

// Setup options for JWT Strategy
const jwtOptions = {
  // jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  jwtFromRequest: (req) => {
    var token = null
    if(req && req.cookies) {
      token = req.cookies['jwt']
    }
    return token
  },
  secretOrKey: config.jwt_secret
}

//Create JWT strategy
// payload = decoded jwt = {sub, iat}
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if userid in payload exists in DB.
  // If so, call done with that user, otherwise callback
  // done without a user object.
  models.User.findById(payload.sub)
  .then(user => {
    if(!user) {
      return done(null, false)
    }
    return done(null, user)
  })
  .catch(error => {
    return done(error, false)
  })
})


// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
