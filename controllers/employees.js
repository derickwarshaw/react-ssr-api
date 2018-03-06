const models = require('../db/models')

exports.getAll = function(req, res, next) {
  models.Employee.findAll()
  .then(employees => {
    return res.json(employees)
  })
  .catch(error => {
    return next(error)
  })
}
