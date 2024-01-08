const Comment = require('../models/commentModel')

const getComments = async(req, res) => {

    const issue_id = req.params.id
    const commments = await Comment.find({issue_id}).sort({createdAt: -1})
    res.status(200).json(commments)
}


const createComment = async (req, res) => {
    const { author_id, author_name, issue_id, comment } = req.body;

    if (!comment || comment.length < 10) {
        return res.status(400).json({ error: "Comment must be at least 10 characters long" });
    }

    try {
        // Assuming Comment.create expects an object with these properties
        const newComment = await Comment.create({ author_id, author_name, issue_id, comment });
        res.status(200).json(newComment);
    } catch (err) {
        console.error("error", err);
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getComments, 
    createComment
}

