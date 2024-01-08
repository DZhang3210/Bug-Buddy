const express = require('express')
const {getIssues, getIssue, deleteIssue} = require('../controllers/resolvedIssueController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all workout routes

router.use(requireAuth)

router.get('/general/:teamID', getIssues)

router.get('/:id', getIssue)


router.delete('/:id', deleteIssue)


module.exports = router