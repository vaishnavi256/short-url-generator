const {getUser} = require ("../service/auth")

// after doing this we dont need restrictToLoggedInUser and checkAuth

// these two function can handle authorisation and authentication

function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie){
        return next();
    }
    // after having the value we need to validate it
    const token = tokenCookie;
    const user = getUser (token);
    req.user = user;
    return next();
}

function restrictTo(roles = []){
    //closure
    return function(req, res, next){
        if (!req.user) return res.redirect("/login");

        if (!roles.includes(req.user.role)) return res.end("unauthorised");

        return next();
    };
}


// async function restrictToLoggedInUser (req, res, next){
//     const userId = req.headers["authorization"];
//     console.log(userId);
//     if (!userId) return res.render("login");
//     const token = userId.split("Bearer ")[1];
//     const user = getUser(token);
//     console.log(user);
//     if (!user) return res.render("login");
//     req.user = user;
//     next();
// }

// async  function checkAuth(req, res, next){
//     const userId = req.headers["authorization"];
//     const token = userId.split("Bearer ")[1];
//     const user = getUser (token);
//     req.user = user;
//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo,
}