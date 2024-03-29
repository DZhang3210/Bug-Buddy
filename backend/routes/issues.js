const express = require('express')
const {createIssue, getIssues, getEIssues, getIssue, deleteIssue, updateIssue} = require('../controllers/issueController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all workout routes

router.use(requireAuth)


router.get('/general/:teamID/:filter/:uid/', getEIssues) 

router.get('/general/:teamID/:filter/:uid/:keyword', getIssues) 

router.get('/:id', getIssue)

router.post('/', createIssue)

router.delete('/:id', deleteIssue)

router.patch('/:id', updateIssue)

module.exports = router