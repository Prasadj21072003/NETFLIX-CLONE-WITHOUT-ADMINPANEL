const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const authroute = require("./routes/auth.js");
const user = require("./routes/User.js");
const Movie = require("./routes/Movie.js");
const List = require("./routes/List.js");

const cors = require("cors");

app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection done"));

app.use(express.json());
app.use("/api/auth", authroute);
app.use("/user", user);
app.use("/Movie", Movie);
app.use("/list", List);

app.listen(8080, () => {
  console.log("server start");
});
