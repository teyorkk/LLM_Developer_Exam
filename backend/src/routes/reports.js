const express = require("express");

const auth = require("../middleware/auth");
const { generateSimpleReport } = require("../controllers/reportController");

const router = express.Router();

router.use(auth);

router.get("/simple", generateSimpleReport);

module.exports = router;