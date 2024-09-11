const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI); // Add this line for debugging
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(chalk.cyan.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red.bold("Error connecting to MongoDB:"), error);
    process.exit();
  }
};

module.exports = connectDB;
