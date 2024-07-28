const express = require("express");
const {
  handleGenerateNewShortURL, 
  handleRedirect, 
  handleGetAnalytics
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId",  handleRedirect);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
