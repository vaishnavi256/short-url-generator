const {getUser} = require ("../service/auth")

async function restrictToLoggedInUser (req, res, next){
    const userId = req.cookies?.uid;
    console.log(userId);
    if (!userId) return res.render("login");
    const user = getUser(userId);
    console.log(user);
    if (!user) return res.render("login");
    req.user = user;
    next();
}

async  function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;
    const user = getUser (userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth,
}