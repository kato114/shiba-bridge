var express = require("express");
var router = express.Router();

const chainList = require("../config/chain.json");
const tokenList = require("../config/token.json");

router.get("/chain", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://31.220.62.199");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  res.send(JSON.stringify(chainList));
});

router.get("/token", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://31.220.62.199");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  res.send(JSON.stringify(tokenList));
});

//export this router to use in our index.js
module.exports = router;
