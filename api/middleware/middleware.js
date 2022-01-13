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
  try {
    const user = await User.getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({message: 'user not found'})
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try { 
    if (!req.body.name) {
      res.status(400).json({message: 'missing required name field'})
    } else {
      next()
    }
  } catch {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({message: 'missing required text field'})
  } else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}