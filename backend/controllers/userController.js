const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//sign up user

const signupUser = async(req, res) => {
    const {email, password, firstName, lastName, conPassword, teamID} = req.body 
    try{
        const user = await User.signup(email, password, firstName, lastName, conPassword, teamID)
        const userWithTeamID = await User.findById(user._id)
        const liked = userWithTeamID ? userWithTeamID.liked : null;
        const token = createToken(user._id)

        res.status(200).json({id:user._id, firstName, lastName,email, token, teamID, liked})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const userWithTeamID = await User.findById(user._id)
        const teamID = userWithTeamID ? userWithTeamID.teamID : null;
        const firstName = userWithTeamID ? userWithTeamID.firstName : null;
        const lastName = userWithTeamID ? userWithTeamID.lastName : null;
        const liked = userWithTeamID ? userWithTeamID.liked : null;
        const token  = createToken(user._id)

        //console.log('loginUser', {id:user._id, firstName, lastName, email, token, teamID})

        res.status(200).json({id:user._id, firstName, lastName, email, token, teamID, liked})
    }catch(err){
        res.status(404).json({error: err.message})
    }
}


module.exports = {signupUser, loginUser}