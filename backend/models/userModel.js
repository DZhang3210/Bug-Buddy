const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type:String, 
        required: true
    },lastName:{
        type:String, 
        required: true
    },
    email:{
        type:String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    teamID: {
        type: String, 
        required: true
    }, liked:{
        type:Array, 
        required: true
    }
})
//static signup method
userSchema.statics.signup = async function (email, password, firstName, lastName, conPassword, teamID){
    //validation
    if(!email || !password || !firstName || !lastName){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }if(password !== conPassword){
        throw Error('Passwords must match')
    }if (teamID == ""){
        throw Error('Must submit a valid team ID')
    }

    const exist = await this.findOne({email})
    if (exist){
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, firstName, lastName, password: hash, teamID, liked:[]})
    return user;
}

userSchema.statics.login = async function(email, password){
    
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if (!user){
        throw Error('Incorrect Email')
    }
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    //console.log('userModel', user)
    return user
}

module.exports = mongoose.model('User', userSchema)