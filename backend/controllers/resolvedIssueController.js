const mongoose = require("mongoose")
const ResolvedIssues = require('../models/resolvedIssueModel')

const getIssues = async(req, res) => {
    const teamID = req.params.teamID
    //const user_id = req.params.id;
    
    const issues = await ResolvedIssues.find({teamID}).sort({createdAt: -1})
    res.status(200).json(issues)
}

const getIssue = async(req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such issue"})
    }

    const issue = await ResolvedIssues.findById(id)
    
    if (!issue) return res.status(404).json({error : "No such issue"})
    res.status(200).json(issue)
}


const deleteIssue = async (req, res) => {
    const{ id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such issue"})
    }
    const issue = await ResolvedIssues.findOneAndDelete({_id: id})
    if(!issue) return res.status(404).json("error")
    res.status(200).json(issue)
}


module.exports= {
    getIssues, 
    getIssue, 
    deleteIssue
}