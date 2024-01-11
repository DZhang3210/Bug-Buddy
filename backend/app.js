const path = require('path');
const dotenv = require('dotenv');
const punycode = require('punycode/');
const express = require('express')
const mongoose = require('mongoose')
const issueRoutes = require('./routes/issues')
const signupRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')
const resolvedIssuesRoutes = require('./routes/rIssues')

//express app
const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors(corsOptions))

//Routes
app.use('/api/comment', commentRoutes)

//app.use('/api/rissue, resolvedIssueRoutes')

app.use('/api/issue',issueRoutes)

app.use('/api/user', signupRoutes)

const envPath = path.resolve(__dirname, '../.env');

// Configure dotenv
dotenv.config({ path: envPath });

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(
    //Start up express app
    app.listen(process.env.PORT || 4000, () => {
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



