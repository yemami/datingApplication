const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const profileRoutes = require("./routes/profileRoutes");
const searchRoutes = require("./routes/searchRoutes");

const config = require("./config/config");

(async function () {
  try {
    await mongoose.connect(config.MONGODB_URI);

    console.log(`connected to DB`);
  } catch (e) {
    console.log(`Error connecting to DB`, e);
  }
})();

const app = express();
// setting middlewaes
app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
// set static folder

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/chats", chatRoutes);
app.use("/profile", profileRoutes);
app.use("/search", searchRoutes);

app.all("*", (req, res, next) => {
  next(new Error("No route found"));
});

// start server
app.listen(config.PORT, () => console.log(`listening on ${config.PORT}`));

process.on("exit", () => {
  mongoose.disconnect();
});
