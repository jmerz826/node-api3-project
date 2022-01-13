const req = require('express/lib/request')
const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`request method: ${req.method}`)
  console.log(`request url: ${req.url}`)
  const timestamp = new Date(Date.now())
  console.log(timestamp.toLocaleString())

  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id)
    
    if (user) {
      req.user = user
      next()
    } else {
      next({status: 404, message: 'user not found'})
    }
  } catch (err) {
    next(err)
  }
  
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}