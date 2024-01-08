const express = require('express')
const router = express.Router()
const {getComments, createComment} = require('../controllers/commentController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/:id', getComments)

router.post('/', createComment)

module.exports = router;