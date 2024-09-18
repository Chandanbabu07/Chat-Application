const express = require("express");
const { protect } = require("../middleware/authMiddleware"); 
const {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  addUsers,
  removeUsers,
  fetchPerticularChat,
} = require("../controllers/chatControllers");

const router = express.Router();
router.route("/").post(protect, accessChats);
router.route("/").get(protect, fetchChats);
// router.route("/fetchPerticularChat").get(protect, fetchPerticularChat);

router.route("/createGroup").post(protect, createGroupChat);
router.route("/renameGroup").put(protect, renameGroup);
router.route("/addUsers").put(protect, addUsers);
router.route("/removeUsers").put(protect, removeUsers);

module.exports = router;
