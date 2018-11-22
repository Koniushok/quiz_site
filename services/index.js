//routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const userTest = require("./routes/userTest");
//
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const app = express();

mongoose
  .connect(config.get("db"))
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB"));

app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/userTest", userTest);

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening (port: ${port})`));
