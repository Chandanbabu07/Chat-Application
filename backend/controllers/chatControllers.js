const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { json } = require("express");

const accessChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  console.log("userIds", userId, req.user.id);

  if (!userId) {
    console.log("User Id Not Found");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(fullChat);
    } catch (error) {
      res.status(400);

      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .sort({ updatedAt: -1 })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage"); // Ensure sorting happens here
    console.log(chats);

    // Populate latestMessage.sender
    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(200).send(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  console.log(req.body.name, req.body.users);

  if (!req.body.name || !req.body.users) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  console.log(req.body.name, req.body.users);

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send({ message: "More than 2 users should exist" });
  }

  users.push(req.user);
  console.log("users", users);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    console.log("groupChat", groupChat);

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    console.log("fullGroupChat", fullGroupChat);

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const chatId = req.body.chatId;
  const updatedGroupName = req.body.updatedGroupName;

  const updateGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: updatedGroupName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateGroup) {
    res.status(400);
    throw new Error("chat not found");
  } else {
    res.status(200).json(updateGroup);
  }
});

const addUsers = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const addedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addedUser) {
    res.status(400);
    throw new Error("User Not added");
  } else {
    res.status(200).json(addedUser);
  }
});

const removeUsers = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removedUser) {
    res.status(400);
    throw new Error("User Not added");
  } else {
    res.status(200).json(removedUser);
  }
});

module.exports = {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  addUsers,
  removeUsers,
};
