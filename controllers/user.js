const User = require ("../models/user")
const {v4 : uuidv4} = require("uuid");
const { setUser, getUser } = require("../service/auth");


async function handleSignUp (req, res){
    const {name, email, password} = req.body;
    const entry = await User.create ({
        name,
        email,
        password
    } )
    return res.render("home");
}

async function handleLogin (req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    console.log(user);
    if (!user){
        return res.render("login", {
            error : "Invalid username or password"
        })
    }
    
    const token = setUser(user);
    res.cookie("uid", token);
    return res.json({token});
}

module.exports = {handleSignUp, handleLogin};