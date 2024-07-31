const {getUser} = require ("../service/auth")

async function restrictToLoggedInUser (req, res, next){
    const userId = req.headers["cookie"];
    console.log(userId);
    console.log(req.headers);
    if (!userId) return res.render("login");

    const token = userId.split("uid=")[1]; // "Bearer [wdnfrhbf]"
    const user = getUser(token);
    console.log(user);
    if (!user) return res.render("login");
    req.user = user;
    next();
}

async  function checkAuth(req, res, next){
    console.log(req.headers);
    const userId = req.headers["cookie"];
    
    const token = userId.split("uid=")[1];
    const user = getUser (token);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth,
}