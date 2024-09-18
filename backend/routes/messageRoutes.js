const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  sendMessage,
  fetchAllMessage,
} = require("../controllers/messageControllers");

const router = express.Router();

router.route("/:chatId").get(protect, fetchAllMessage);
router.route("/").post(protect, sendMessage);

module.exports = router;
