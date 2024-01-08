const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema ({
    author_id:{
        type: String, 
        required: true
    },
    author_name:{
        type:String, 
        required: true
    },
    issue_id:{
        type: String, 
        required: true
    },
    comment:{
        type: String, 
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)