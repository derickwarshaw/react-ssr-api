const jwt = require('jwt-simple')
const config = require('../config/env_config')
const models = require('../db/models')
const jwtCsrf = require('jwt-csrf')
const {csrf_secret} = require('../config/env_config')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwt_secret)
}

exports.signin = function(req, res, next) {
  // User email and password already auth'd, they just need a token.
  const token = tokenForUser(req.user)
  const csrfToken = jwtCsrf.getHeaderToken(req, res, {secret: csrf_secret})
  res.cookie('jwt', token, {httpOnly: true})
  return res.json({ csrfToken: csrfToken, user: req.user.email})
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if(!email || !password) {
    return res.status(422).send({error: 'You must provide an email and password'})
  }

  // See if a user with given email exists.
  models.User.findOne({where: {email: email}})
  .then(user => {
    if(user) { return res.status(422).send({error: 'Email is in use'}) }

    // If user does not exist, create and save user record
    models.User.create({
      email: email,
      password: password
    }).then((user) => {
      const token = tokenForUser(user)
      const csrfToken = jwtCsrf.getHeaderToken(req, res, {secret: csrf_secret})
      res.cookie('jwt', token, {httpOnly: true})
      return res.json({ csrfToken: csrfToken, user: user.email})
    }).catch(error => {
      return next(error)
    })
  })
  .catch(error => {
    return next(error)
  })
}
