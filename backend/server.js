const express = require("express");
const chats = require("./Data/data");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const colors = require("colors");
const userRoutes = require("../backend/routes/userRoutes");
const chatRoutes = require("../backend/routes/chatRoutes");
const messageRoutes = require("../backend/routes/messageRoutes");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const { Socket } = require("socket.io");

const app = express();
dotenv.config();
console.log("Mongo URI from test:", process.env.MONGO_URI);

connectDB();

app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("API Running Successfully");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1700;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:1700",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    console.log("setup", userData?._id);
    socket.emit("Connected");
  });

  socket.on("joinchat", (room) => {
    socket.join(room._id);
    console.log("room", room._id);
    socket.emit("Joined the Room");
  });

  socket.on("newmessage", (newMessageRecevied) => {
    var chat = newMessageRecevied.chat;
    console.log("new Message Entered", chat.users);
    if (!chat.users) console.log("Chat.users not defined");

    chat?.users?.forEach((user) => {
      if (user._id == newMessageRecevied.sender._id) {
        console.log("Eoorrpir");
      } else {
        console.log("success", newMessageRecevied);
        socket.in(user._id).emit("message recieved", newMessageRecevied);
      }
    });
  });
});
