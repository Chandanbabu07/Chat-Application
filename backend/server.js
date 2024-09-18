const express = require("express");
const chats = require("./Data/data");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const colors = require("colors");
const userRoutes = require("../backend/routes/userRoutes");
const chatRoutes = require("../backend/routes/chatRoutes");
const messageRoutes = require("../backend/routes/messageRoutes");


const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
console.log("Mongo URI from test:", process.env.MONGO_URI);

connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1700;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});
