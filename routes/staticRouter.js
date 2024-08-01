const express = require ("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");


router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => { 
    const allUrls = await URL.find({});
    return res.render('home', {
        urls : allUrls,
    });
})

router.get('/', restrictTo(["ADMIN", "NORMAL"]), async (req, res) => { 
    console.log(req.user._id);
    const allUrls = await URL.find({ createdBy : req.user._id });
    return res.render('home', {
        urls : allUrls,
    });
})
    router.get('/signup', async (req, res) => {
        return res.render("signup")
    })

router.get('/login', async (req, res) => {
    return res.render("login")
})

module.exports = router;