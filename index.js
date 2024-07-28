const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require ("path");
const {connectToMongoDB} = require("./connect");
const URL = require ("./models/url")
const PORT = 8008;
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUser, checkAuth} = require("./middleware/auth")
// router
const urlRoute = require("./routes/url");
const staticRoute = require ("./routes/staticRouter");
const userRoute = require("./routes/user");


connectToMongoDB("mongodb://localhost:27017/shorturl");

/*Putting it together, app.set("views", path.resolve("./view")); tells Express to look for view templates in the view directory at the specified absolute path. This is essential for rendering views using a templating engine like EJS, Pug, or Handlebars. */

app.set ("view engine", "ejs");
app.set ("views", path.resolve("./view"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use (cookieParser());

// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render("home", {
//         urls : allUrls,
//     }); 
// })

app.use('/', checkAuth, staticRoute);
app.use("/user", userRoute);
app.use('/url', restrictToLoggedInUser , urlRoute);

app.listen (PORT, () => console.log(`Server Started at PORT: ${PORT}`));