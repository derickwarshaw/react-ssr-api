const Authentication = require('./controllers/authentication')
const Employees = require('./controllers/employees')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({
      message: 'Super secret code is ABC123'
    })
  })
  app.get('/current_user', requireAuth, function(req, res) {
    const email = req.user ? req.user.email : null
    res.send({
      user: email
    })
  })
  app.get('/employees', Employees.getAll)
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)
}
