const express = require('express')

// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model')
const Post = require('../posts/posts-model')
// The middleware functions also need to be required
const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware')

const router = express.Router()

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
})

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
})

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body).then(newUser => {
    res.status(200).json(newUser)
}).catch(err => {
    res.status(500).json({message: err.message})
  })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body).then(updatedUser => {
    res.json(updatedUser)
  }).catch(err => {
    res.status(500).json({message: err.message})
  })
})

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const user = await User.getById(req.params.id)
  User.remove(req.params.id)
    .then(res.status(200).json(user))
    .catch(err => {
      res.status(500).json({message: err.message})
  })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
    res.json({message: err.message})
  })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Post.insert(req.body).then(post => {
    res.json(post)
  }).catch(err => {
    res.json({message: err.message})
  })

})

// do not forget to export the router

module.exports = router
