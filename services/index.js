//routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const userTest = require("./routes/userTest");
const publicTests = require("./routes/publicTests");
const statistics = require("./routes/statistics");
const testStatistics = require("./routes/testStatistics");
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
app.use("/api/publicTests", publicTests);
app.use("/api/statistics", statistics);
app.use("/api/testStatistics", testStatistics);

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening (port: ${port})`));
