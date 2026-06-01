const express = require("express");

const auth = require("../middleware/auth");
const {
  listDiaries,
  getDiary,
  createDiary,
  updateDiary,
  deleteDiary,
} = require("../controllers/diaryController");

const router = express.Router();

router.use(auth);

router.get("/", listDiaries);
router.get("/:id", getDiary);
router.post("/", createDiary);
router.put("/:id", updateDiary);
router.delete("/:id", deleteDiary);

module.exports = router;