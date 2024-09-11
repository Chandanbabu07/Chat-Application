const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../Config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter Required Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration UnSuccessfull");
  }
});

const authUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration UnSuccessfull");
  }
});

const usersList = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user.id } });

  res.send(users);

  console.log(keyword);
});

const fetchUserInfo = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  console.log("userId", userId);
  // Fetch user information
  const userInfo = await User.findOne({ _id: userId });

  if (userInfo) {
    // Send user info if found
    res.status(200).json({ userInfo, token: generateToken(userInfo._id) });
  } else {
    // If user info not found, send a 404 status and error
    res.status(404);
    throw new Error("User not found. Please log in.");
  }
});

module.exports = { registerUser, authUsers, usersList, fetchUserInfo };