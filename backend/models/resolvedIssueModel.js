const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resolvedIssueSchema = new Schema ({
    issue_id:{
        type: Number, 
        required: true
    },
    title:{
        type: String, 
        required: true
    },
    author_id:{
        type: String, 
        required: true
    },
    author_name:{
        type: String, 
        required: true
    },
    description:{
        type: String, 
        required: true
    },tags:{
        type: Array, 
        required: true
    },teamID:{
        type:String,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('ResolvedIssues', resolvedIssueSchema)