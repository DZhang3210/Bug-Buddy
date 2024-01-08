require('dotenv').config()

const punycode = require('punycode/');
const express = require('express')
const mongoose = require('mongoose')
const issueRoutes = require('./routes/issues')
const signupRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')
const resolvedIssuesRoutes = require('./routes/rIssues')

//express app
const app = express();
app.use(express.json());    //parses JSON

//Routes
app.use('/api/comment', commentRoutes)

//app.use('/api/rissue, resolvedIssueRoutes')

app.use('/api/issue',issueRoutes)

app.use('/api/user', signupRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(
    //Start up express app
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port '+ process.env.PORT)
    })
)
.catch(err => console.log(err))

//Developement function, checking requests
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next();
})

//Default Home app
app.get('/', (req, res) => {
    res.json({mssg: "Welcome to the app"})
})

//const URL =   "http://localhost:4000"



