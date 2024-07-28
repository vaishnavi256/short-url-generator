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
    
    console.log(user);
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.render("home");
}

module.exports = {handleSignUp, handleLogin};