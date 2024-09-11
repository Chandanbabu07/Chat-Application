const express = require("express");
const {
  registerUser,
  authUsers,
  usersList,
  fetchUserInfo,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, usersList);
router.route("/login").post(authUsers);
router.route("/fetchUserInfo").get(fetchUserInfo);

module.exports = router;
