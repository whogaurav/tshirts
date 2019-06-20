var express = require("express");
var router = express.Router();
var db = require("diskdb");
db.connect("./data", ["tshirts"]);

/* GET home page. */
router.get("/api/tshirts", function(req, res, next) {
  res.json(db.tshirts.find());
});

/* GET home page. */
router.post("/api/tshirts", function(req, res, next) {
  const item = req.body;
  console.log("Adding new item: ", item);
  db.tshirts.save({ ...item, date: new Date(Date.now()).toLocaleString() });
  res.json(db.tshirts.find());
});

module.exports = router;
