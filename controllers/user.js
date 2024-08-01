const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    return res.render("home");
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log(user);
    if (!user) {
        return res.render("login", { error: "Invalid username or password" });
    }
    
    const token = setUser(user);
    res.cookie("token", token);
    return res.render("home"); 
}

module.exports = { handleSignUp, handleLogin };
