// Main starting point of application
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const router = require('./router')
const models = require('./db/models')
const cors = require('cors')
const {csrf_secret} = require('./config/env_config')
const jwtCSRF = require('jwt-csrf')

const app = express()

// App setup
app.use(morgan('combined'))
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(bodyParser.json({type: '*/*'}))
app.use(cookieParser())
app.use(jwtCSRF.middleware({ secret: csrf_secret,
                             excludeUrls: ['/current_user', '/signin']}))
app.use(function(err, req, res, next) {
  if(err instanceof jwtCSRF.CSRFError) {
    console.log("CSRF ERROR: ", err)
  }
})
router(app)


// Server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)

models.sequelize.sync().then(() => {
  server.listen(port)
  console.log('Server listening on: ', port)
})
