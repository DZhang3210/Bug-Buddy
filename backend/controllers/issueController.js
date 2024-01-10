const mongoose = require("mongoose")
const Issue = require('../models/issueModel')

const getIssues = async(req, res) => {
    const teamID = req.params.teamID
    //const user_id = req.params.id;
    
    const issues = await Issue.find({teamID}).sort({createdAt: -1})
    issues.sort((a, b) => {
        const aIsResolved = a.tags.includes("resolved");
        const bIsResolved = b.tags.includes("resolved");
    
        if (aIsResolved && !bIsResolved) {
            return 1; // a goes to the bottom
        } else if (!aIsResolved && bIsResolved) {
            return -1; // b goes to the bottom
        } else {
            // If both are resolved or both are non-resolved, sort by createdAt
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });
    
    res.status(200).json(issues)
}

const getIssue = async(req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such issue"})
    }

    const issue = await Issue.findById(id)
    
    if (!issue) return res.status(404).json({error : "No such issue"})
    res.status(200).json(issue)
}

// router.get('/:id', (req, res) => {
//     res.json({message: "GET a single workout"})
// })

const createIssue = async (req, res) => {
    //Issue_id, title, [Author_id], Author_name, Description, Tags
    const {author_id, issue_id, title, author_name, description:desc, tags, teamID} = req.body
    let emptyFields = []
    if(!issue_id){emptyFields.push('issue_id')}
    if(!title){emptyFields.push('title')}
    if(!author_name){emptyFields.push('author_name')}
    if(!desc){emptyFields.push('desc')}
    if(!tags){emptyFields.push('tags')}
    if(!teamID){emptyFields.push('teamID')}

    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all empty fields", emptyFields})
    }

    try{
        // const author_id = req.user._id;
        //const author_id = req.params.id;
        const issue = await Issue.create({issue_id, title, author_id, author_name, description:desc, tags, teamID})
        res.status(200).json(issue)
    }catch(err){
        console.log("error")
        res.status(500).json({error: err.message})
    }
}

const deleteIssue = async (req, res) => {
    const{ id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such issue"})
    }
    const issue = await Issue.findOneAndDelete({_id: id})
    if(!issue) return res.status(404).json("error")
    res.status(200).json(issue)
}

const updateIssue = async(req, res) => {
    const{ id } = req.params
    const {action, title, description} = req.body
    const currState = await Issue.findOne({_id: id}).select('tags')
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Issue"})
    }
    try {
        if (action === "resolve") {
            if(currState.tags.length === 0){
                const updatedIssue = await Issue.findOneAndUpdate(
                    { _id: id },
                    { tags: ["resolved"] },
                    { new: true } // Return the updated document
                );
                if (!updatedIssue) {
                    return res.status(404).json({ error: "Issue not found" });
                }
                res.status(200).json(updatedIssue);
            }else{
                const updatedIssue = await Issue.findOneAndUpdate(
                    { _id: id },
                    { tags: [] },
                    { new: true } // Return the updated document
                );
                if (!updatedIssue) {
                    return res.status(404).json({ error: "Issue not found" });
                }
                res.status(200).json(updatedIssue);
            }
        }else{
            const updatedIssue = await Issue.findOneAndUpdate(
                {_id: id}, {title, description}, {new:true}
            );
            if (!updatedIssue) {
                return res.status(404).json({ error: "Issue not found" });
            }
            res.status(200).json(updatedIssue);
        }
        // Handle other actions here if necessary
    } catch (error) {
        // Handle any other errors that might occur during the update
        res.status(500).json({ error: error.message });
    }
}

module.exports= {
    createIssue,
    getIssues, 
    getIssue, 
    deleteIssue, 
    updateIssue
}